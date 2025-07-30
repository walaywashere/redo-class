import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Class 11-Newton | Excellence in Education",
  description: "Meet the amazing students, leadership team, and achievements of Class 11-Newton. A diverse community dedicated to academic excellence and positive impact.",
  keywords: ["class", "students", "education", "newton", "achievements", "leadership"],
  authors: [{ name: "Class 11-Newton" }],
  openGraph: {
    title: "Class 11-Newton | Excellence in Education",
    description: "Meet the amazing students, leadership team, and achievements of Class 11-Newton.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ErrorBoundary>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
