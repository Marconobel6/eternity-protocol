const countries = [
  { name: 'USA', flag: '🇺🇸' }, { name: 'UK', flag: '🇬🇧' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' }, { name: 'Netherlands', flag: '🇳🇱' }, { name: 'Germany', flag: '🇩🇪' },
  { name: 'Sweden', flag: '🇸🇪' }, { name: 'Denmark', flag: '🇩🇰' }, { name: 'Norway', flag: '🇳🇴' },
  { name: 'Ireland', flag: '🇮🇪' }, { name: 'UAE', flag: '🇦🇪' }, { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Singapore', flag: '🇸🇬' }, { name: 'France', flag: '🇫🇷' }, { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Poland', flag: '🇵🇱' },
]

export default function CommunityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Community</h1>
      <p className="text-gray-500 mb-4 max-w-2xl">Join your local Eternity community to discuss peptides, GLP-1, longevity research, and metabolic health with people in your region.</p>
      <p className="text-sm text-gray-400 mb-10">All groups are for education and research discussion only. No medical advice.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map(c => (
          <div key={c.name} className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.flag}</span>
              <div>
                <h3 className="font-medium text-navy text-sm">{c.name}</h3>
                <p className="text-xs text-gray-400">Peptides, GLP-1 & Longevity</p>
              </div>
            </div>
            <a href="#" className="text-xs font-medium px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors">Join</a>
          </div>
        ))}
      </div>
    </div>
  )
}
