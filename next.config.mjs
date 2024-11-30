/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/community-workshops",
        destination: "/resources/workshop",
      },
      {
        source: "/training",
        destination: "/resources/training",
      },
      {
        source: "/shifa-lessons",
        destination: "/resources/lesson",
      },
      {
        source: "/advice-faq",
        destination: "/qa",
      },
      {
        source: "/contact",
        destination: "/forms/contact-form",
      },
      {
        source: "/counseling-request-form",
        destination: "/forms/counseling-request-form",
      },
      {
        source: "/improving-communication",
        destination: "/qa",
      },
      {
        source: "/ramadan",
        destination: "/qa",
      },
      {
        source: "/youth",
        destination: "/qa",
      },
      {
        source: "/raising-children",
        destination: "/qa",
      },
      {
        source: "/disorders",
        destination: "/qa",
      },
      {
        source: "/schizophrenia",
        destination: "/qa",
      },
    ]
  },
}

export default nextConfig
