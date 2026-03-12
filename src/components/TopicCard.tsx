import Link from "next/link"

type TopicCardProps = {
  title: string
  description: string
  icon: string
  href: string
}

export default function TopicCard({ title, description, icon, href }: TopicCardProps) {
  return (
    <Link href={href} className="group relative block p-7 bg-sage-bg rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-500">
      <div className="relative z-10">
        <div className="text-[32px] mb-4">{icon}</div>
        <h3 className="text-[17px] font-medium tracking-[-0.02em] text-forest mb-2">{title}</h3>
        <p className="text-[14px] text-[rgba(0,0,0,0.45)] leading-relaxed">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </div>
    </Link>
  )
}
