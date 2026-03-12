"use client"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/research", label: "Research" },
    { href: "/shop", label: "Shop" },
    { href: "/community", label: "Community" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
        <Link href="/" className="text-[22px] font-medium tracking-[-0.04em] text-forest">
          eternity
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="px-4 py-2 text-[15px] text-[rgba(0,0,0,0.55)] hover:text-[rgba(0,0,0,0.88)] transition-colors rounded-full hover:bg-sage-bg/60">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Link href="/research" className="px-5 py-2.5 text-[14px] font-medium bg-forest text-white rounded-full hover:bg-forest-light transition-colors">
            Explore Research
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-sage-bg px-2 pb-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-[15px] text-[rgba(0,0,0,0.65)] hover:bg-sage-bg/50 rounded-xl transition-colors">
              {l.label}
            </Link>
          ))}
          <div className="px-4 pt-2">
            <Link href="/research" onClick={() => setOpen(false)} className="block text-center px-5 py-2.5 text-[14px] font-medium bg-forest text-white rounded-full hover:bg-forest-light transition-colors">
              Explore Research
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
