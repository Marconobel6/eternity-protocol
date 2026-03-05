import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Eternity</h3>
            <p className="text-sm text-gray-400">Science-backed longevity research. Peptides, GLP-1, and metabolic health.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link href="/research" className="text-sm text-gray-400 hover:text-white transition-colors">Research</Link>
              <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">Shop</Link>
              <Link href="/community" className="text-sm text-gray-400 hover:text-white transition-colors">Community</Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Disclaimer</h4>
            <p className="text-xs text-gray-500">For education and research discussion only. Not medical advice. Consult a healthcare professional before starting any protocol.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Eternity Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
