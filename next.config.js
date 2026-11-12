/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.app.github.dev'],
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // frame-ancestors must keep app.ngfsystems.com, or the portal
            // editor's live preview is blocked by the browser.
            //
            // NOTE: ngf-doctor also asks for default-src, object-src,
            // base-uri and form-action here. Those are deliberately NOT added
            // in this change: this page loads Google Fonts and gtag, so a
            // default-src written without a browser to verify against would
            // silently break the analytics or the typeface. Add them in a
            // change that can be checked in a real browser.
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://app.ngfsystems.com https://*.vercel.app",
          },
          {
            // Stop the browser guessing a response's type — the usual route
            // from an uploaded file to a script execution.
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Send the full URL within our own origin, only the origin
            // cross-site, and nothing at all when downgrading to http.
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Nothing on this site uses any of these.
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
