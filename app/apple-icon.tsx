import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '180px',
          height: '180px',
          background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'white', fontSize: '80px', fontWeight: 800, letterSpacing: '-2px' }}>
          N
        </span>
      </div>
    ),
    { ...size }
  )
}
