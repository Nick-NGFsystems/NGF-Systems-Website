import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.25) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            gap: '24px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
            <span style={{ fontSize: '72px', fontWeight: 800, color: '#3b82f6', letterSpacing: '-2px' }}>NGF</span>
            <span style={{ fontSize: '72px', fontWeight: 800, color: 'white', letterSpacing: '-2px' }}>systems</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              fontWeight: 400,
              letterSpacing: '0px',
            }}
          >
            Web Design &amp; Management
          </div>

          {/* Divider */}
          <div style={{ width: '60px', height: '2px', background: '#2563eb', borderRadius: '2px' }} />

          {/* Pills */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Michigan-based', 'Custom Websites', 'Flexible Pricing'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '18px',
                  color: '#93c5fd',
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* URL */}
          <div style={{ fontSize: '20px', color: '#475569', marginTop: '8px' }}>
            ngfsystems.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
