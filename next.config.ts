import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Enforced, not Report-Only: the directives below are what the site actually
 * loads, so `base-uri`, `form-action`, `object-src`, `frame-ancestors` and the
 * origin allowlists all apply to real traffic.
 *
 * Known limit: `script-src` still carries `'unsafe-inline'`, because the GTM
 * and Meta Pixel bootstrap snippets are inline. That means this policy does not
 * mitigate injected inline script. Upgrading to a nonce plus `'strict-dynamic'`
 * requires moving those snippets behind a middleware-generated nonce; do that
 * before relying on CSP as an XSS control.
 *
 * `require-trusted-types-for 'script'` stays omitted: React's DOM sinks violate
 * it on every render, which floods the DevTools Issues panel with noise.
 */
const isProduction = process.env.NODE_ENV === "production";

// React's development build calls eval() for debugging features such as
// rebuilding callstacks. Production never does, so the allowance is dev-only.
const devScriptSrc = isProduction ? "" : " 'unsafe-eval'";

// `next dev` pushes hot-reload updates over a websocket on the dev origin.
const devConnectSrc = isProduction ? "" : " ws:";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScriptSrc} https://www.googletagmanager.com https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  // i.pravatar.cc serves the placeholder testimonial avatars; flagcdn.com the
  // phone-input country flags.
  "img-src 'self' data: blob: https://flagcdn.com https://i.pravatar.cc https://www.googletagmanager.com https://www.facebook.com https://www.google-analytics.com",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${devConnectSrc} https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://connect.facebook.net https://www.facebook.com`,
  // googletagmanager.com covers the GTM <noscript> iframe in app/layout.tsx.
  "frame-src 'self' https://www.googletagmanager.com https://www.facebook.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
