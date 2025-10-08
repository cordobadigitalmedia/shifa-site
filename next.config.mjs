/** @type {import('next').NextConfig} */
import { withBotId } from "botid/next/config"

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
        permanent: false,
      },
      {
        source: "/training",
        destination: "/resources/training",
        permanent: false,
      },
      {
        source: "/shifa-lessons",
        destination: "/resources/lesson",
        permanent: false,
      },
      {
        source: "/advice-faq",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/forms/contact-form",
        permanent: false,
      },
      {
        source: "/counseling-request-form",
        destination: "/forms/counseling-request-form",
        permanent: false,
      },
      {
        source: "/improving-communication",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/ramadan",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/youth",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/raising-children",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/disorders",
        destination: "/qa",
        permanent: false,
      },
      {
        source: "/schizophrenia",
        destination: "/qa",
        permanent: false,
      },
    ]
  },
}

export default withBotId(nextConfig)
