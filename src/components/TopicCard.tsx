import Link from 'next/link'

type TopicCardProps = {
  title: string
  description: string
  icon: string
  href: string
}

export default function TopicCard({ title, description, icon, href }: TopicCardProps) {
  return (
    <Link href={href} className="group block p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-navy group-hover:text-accent transition-colors mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  )
}
