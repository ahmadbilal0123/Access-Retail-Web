import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ModernNavbar from "@/components/navbar/modern-navbar"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Access Retail",
  description: "Retail intelligence solutions across Pakistan & Afghanistan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://www.accessretailpk.com/wp-content/uploads/2024/03/AR-logo01-trasparent.png" type="image/png" />
        {/* Add external script file for scroll prevention */}
        <Script src="/scroll-fix.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ModernNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'