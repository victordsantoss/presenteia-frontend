import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Presenteia - Presenteie quem você ama'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            🎁 Presenteia
          </div>
          <div
            style={{
              fontSize: '48px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Presenteie quem você ama
          </div>
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Transforme momentos especiais em presentes inesquecíveis
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}


