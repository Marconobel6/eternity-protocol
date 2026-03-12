const countries = [
  { name: "USA", flag: "\uD83C\uDDFA\uD83C\uDDF8" }, { name: "UK", flag: "\uD83C\uDDEC\uD83C\uDDE7" }, { name: "Canada", flag: "\uD83C\uDDE8\uD83C\uDDE6" },
  { name: "Australia", flag: "\uD83C\uDDE6\uD83C\uDDFA" }, { name: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1" }, { name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { name: "Sweden", flag: "\uD83C\uDDF8\uD83C\uDDEA" }, { name: "Denmark", flag: "\uD83C\uDDE9\uD83C\uDDF0" }, { name: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4" },
  { name: "Ireland", flag: "\uD83C\uDDEE\uD83C\uDDEA" }, { name: "UAE", flag: "\uD83C\uDDE6\uD83C\uDDEA" }, { name: "Switzerland", flag: "\uD83C\uDDE8\uD83C\uDDED" },
  { name: "Singapore", flag: "\uD83C\uDDF8\uD83C\uDDEC" }, { name: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7" }, { name: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8" },
  { name: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9" }, { name: "Poland", flag: "\uD83C\uDDF5\uD83C\uDDF1" },
]

export default function CommunityPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-16">
      <h1 className="text-[36px] md:text-[48px] font-normal tracking-[-0.05em] text-[rgba(0,0,0,0.88)] mb-2">Community</h1>
      <p className="text-[16px] text-[rgba(0,0,0,0.45)] mb-3 max-w-2xl leading-relaxed">Join your local Eternity community to discuss peptides, GLP-1, longevity research, and metabolic health with people in your region.</p>
      <p className="text-[13px] text-[rgba(0,0,0,0.3)] mb-12">All groups are for education and research discussion only. No medical advice.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {countries.map(c => (
          <div key={c.name} className="flex items-center justify-between p-5 bg-white rounded-[16px] border border-black/[0.04] hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.flag}</span>
              <div>
                <h3 className="font-medium text-[rgba(0,0,0,0.88)] text-[15px]">{c.name}</h3>
                <p className="text-[12px] text-[rgba(0,0,0,0.35)]">Peptides, GLP-1 & Longevity</p>
              </div>
            </div>
            <a href="#" className="text-[13px] font-medium px-4 py-2 bg-forest text-white rounded-full hover:bg-forest-light transition-colors">Join</a>
          </div>
        ))}
      </div>
    </div>
  )
}
