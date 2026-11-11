"""Generate the two PNGs an Apple-style lensing filter needs.

feDisplacementMap decodes 128 as neutral: R drives the X shift, G drives Y.
A map that is flat 128/128 through the middle and ramps only inside a band at
the border gives edge-only refraction, which is the whole point. A
full-surface turbulence map instead gives the wobbly-frosted look, which is
not this.

Two outputs per size:
  *-disp.png  R/G displacement, neutral centre, ramp in the edge band
  *-spec.png  alpha-only rim, bright top-left fading to bottom-right, used
              with feComposite operator="in" to keep the specular pass on
              the rim alone.

PNGs are written by hand (zlib + struct) because this image's PIL has no
working _imaging extension.
"""
import math
import os
import struct
import zlib

OUT = os.path.dirname(os.path.abspath(__file__))


def write_png(path, w, h, rows):
    """rows: list of h bytearrays, each w*4 bytes of RGBA."""
    raw = bytearray()
    for r in rows:
        raw.append(0)          # filter type 0, none
        raw.extend(r)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)   # 8-bit RGBA
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
           + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    return len(png)


def rounded_sdf(x, y, w, h, r):
    """Signed distance to a rounded rect, positive inside."""
    cx, cy = w / 2.0, h / 2.0
    qx = abs(x - cx) - (cx - r)
    qy = abs(y - cy) - (cy - r)
    outside = math.hypot(max(qx, 0.0), max(qy, 0.0)) - r
    inside = min(max(qx, qy), 0.0)
    return -(outside + inside)


def normal(x, y, w, h, r, eps=1.0):
    """Inward normal of the SDF, by central difference."""
    dx = rounded_sdf(x + eps, y, w, h, r) - rounded_sdf(x - eps, y, w, h, r)
    dy = rounded_sdf(x, y + eps, w, h, r) - rounded_sdf(x, y - eps, w, h, r)
    n = math.hypot(dx, dy)
    if n < 1e-6:
        return 0.0, 0.0
    return dx / n, dy / n


def clamp8(v):
    return 0 if v < 0 else (255 if v > 255 else int(v))


def make(name, w, h, band=None, amp=118.0, power=2.1):
    """amp shapes the falloff in 0-127 map units; the SVG filter's own
    `scale` sets how far content actually travels."""
    r = h / 2.0                                  # pill
    band = band if band else min(h * 0.46, 30.0)
    rim_band = max(band * 0.34, 1.0)

    disp_rows, spec_rows = [], []
    for y in range(h):
        drow = bytearray(w * 4)
        srow = bytearray(w * 4)
        for x in range(w):
            i = x * 4
            d = rounded_sdf(x + 0.5, y + 0.5, w, h, r)

            # default: neutral displacement, no specular
            drow[i], drow[i + 1], drow[i + 2], drow[i + 3] = 128, 128, 128, 255
            srow[i], srow[i + 1], srow[i + 2], srow[i + 3] = 255, 255, 255, 0

            if d < -0.5 or d >= band:            # outside, or past the band
                continue

            t = 1.0 - (max(d, 0.0) / band)       # 0 at band edge, 1 at the rim
            m = amp * (t ** power)
            nx, ny = normal(x + 0.5, y + 0.5, w, h, r)

            # Push outward along the normal: content stretches at the rim,
            # which is what reads as a thick piece of glass.
            drow[i] = clamp8(round(128 - m * nx + m * 0.05))   # +chromatic split
            drow[i + 1] = clamp8(round(128 - m * ny))
            drow[i + 2] = 128

            rim = 1.0 - (max(d, 0.0) / rim_band)
            if rim > 0.0:
                # normal() returns the INWARD normal, so the outward one is
                # (-nx, -ny). Light sits up-left, i.e. the direction toward it
                # is (-0.7071, -0.7071); facing it is dot(outward, toLight),
                # which reduces to +0.7071*(nx + ny). Getting this sign wrong
                # lights the rim from the bottom-right.
                lean = ((nx * 0.7071) + (ny * 0.7071) + 1.0) / 2.0
                srow[i + 3] = clamp8(round((rim ** 1.5) * (0.14 + 0.86 * (lean ** 2.4)) * 240.0))

        disp_rows.append(drow)
        spec_rows.append(srow)

    dp = os.path.join(OUT, name + "-disp.png")
    sp = os.path.join(OUT, name + "-spec.png")
    print(dp, w, h, write_png(dp, w, h, disp_rows), "bytes")
    print(sp, w, h, write_png(sp, w, h, spec_rows), "bytes")


make("bar", 1000, 64)      # the floating nav
make("pill", 280, 46)      # controls that sit on the screenshot
