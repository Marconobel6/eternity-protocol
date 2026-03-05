import Link from 'next/link'
import type { Article } from '@/lib/supabase'

const categoryColors: Record<string, string> = {
  peptides: 'bg-blue-100 text-blue-700',
  'glp-1': 'bg-green-100 text-green-700',
  longevity: 'bg-purple-100 text-purple-700',
  biohacking: 'bg-orange-100 text-orange-700',
  general: 'bg-gray-100 text-gray-700',
}

export default function ArticleCard({ article }: { article: Article }) {
  const color = categoryColors[article.category] || categoryColors.general
  const date = article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

  return (
    <Link href={`/research/${article.slug}`} className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {article.cover_image_url && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{article.category}</span>
          {date && <span className="text-xs text-gray-400">{date}</span>}
        </div>
        <h3 className="font-semibold text-navy group-hover:text-accent transition-colors mb-2 line-clamp-2">{article.title}</h3>
        {article.excerpt && <p className="text-sm text-gray-500 line-clamp-3">{article.excerpt}</p>}
      </div>
    </Link>
  )
}
