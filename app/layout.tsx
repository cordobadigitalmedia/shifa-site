import "@/styles/globals.css"
import "@/styles/styles.css"
import type { Viewport } from "next"
import { Noto_Sans, Noto_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { BotIdClient } from "botid/client"

import { ThemeProvider } from "@/components/theme-provider"

const protectedRoutes = [
  {
    path: "/forms/contact-form",
    method: "POST",
  },
  {
    path: "/forms/counseling-request-form",
    method: "POST",
  },
]

export const viewport: Viewport = {
  width: "device-width",
}

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
})

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <BotIdClient protect={protectedRoutes} />
        </head>
        <body className={noto_sans.variable + " " + noto_serif.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
