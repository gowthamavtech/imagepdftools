import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ImagePDF.Tools — Free Image & PDF Tools Online';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#111114',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top: logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Icon */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#9d95f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
            </svg>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 600, color: '#e8e6f0', letterSpacing: '-0.02em' }}>
            ImagePDF<span style={{ color: '#6b6880' }}>.Tools</span>
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#f0eeff',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              maxWidth: '900px',
            }}
          >
            Free Image &amp; PDF
            <br />
            <span style={{ color: '#9d95f5' }}>Tools Online.</span>
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#8b8799',
              lineHeight: 1.5,
              maxWidth: '640px',
            }}
          >
            30+ tools. No uploads. No account. Your files never leave your browser.
          </div>
        </div>

        {/* Bottom: trust chips */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['100% Private', 'No Upload', 'Free Forever', 'Works Offline'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '999px',
                background: 'rgba(157,149,245,0.12)',
                border: '1px solid rgba(157,149,245,0.3)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#9d95f5',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '999px',
                  background: '#9d95f5',
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
