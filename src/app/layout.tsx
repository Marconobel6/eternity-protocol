import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Eternity Protocol — Peptides, GLP-1 & Longevity Research",
  description: "Science-backed research on peptides, GLP-1 weight loss, longevity, and metabolic health optimization.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
