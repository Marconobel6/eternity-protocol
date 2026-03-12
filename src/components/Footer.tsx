import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-forest mt-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-[22px] font-medium tracking-[-0.04em] text-white mb-3">eternity</h3>
            <p className="text-[15px] text-white/50 max-w-sm leading-relaxed">Science-backed longevity research. Peptides, GLP-1, and metabolic health — explained with data, not hype.</p>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white/40 uppercase tracking-wider mb-4">Explore</h4>
            <div className="flex flex-col gap-3">
              <Link href="/research" className="text-[15px] text-white/60 hover:text-white transition-colors">Research</Link>
              <Link href="/shop" className="text-[15px] text-white/60 hover:text-white transition-colors">Shop</Link>
              <Link href="/community" className="text-[15px] text-white/60 hover:text-white transition-colors">Community</Link>
              <Link href="/about" className="text-[15px] text-white/60 hover:text-white transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white/40 uppercase tracking-wider mb-4">Disclaimer</h4>
            <p className="text-[13px] text-white/40 leading-relaxed">For education and research discussion only. Not medical advice. Consult a healthcare professional before starting any protocol.</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-[13px] text-white/30">&copy; {new Date().getFullYear()} Eternity Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
