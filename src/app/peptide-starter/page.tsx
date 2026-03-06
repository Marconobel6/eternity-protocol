import Link from 'next/link'
import { getPeptideArticles } from '@/lib/peptideSeries'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function PeptideStarterPage() {
  const articles = await getPeptideArticles()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-sm text-accent font-semibold tracking-wide uppercase mb-2">Eternity Protocol</p>
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Peptide Starter Series (Review)</h1>
      <p className="text-gray-600 mb-10">Internal preview of the seven-article series before publishing. Each draft pulls directly from the WhatsApp intel plus external research. Tap any day to read the current copy.</p>

      {articles.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          No drafts found yet.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <Link key={article.slug} href={`/peptide-starter/${article.slug}`} className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-accent/40 hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm font-semibold text-accent">Day {article.seriesDay}</span>
                {article.category && <span className="text-xs uppercase tracking-wide text-gray-400">{article.category}</span>}
              </div>
              <h2 className="text-xl font-semibold text-navy mb-2">{article.title}</h2>
              {article.excerpt && <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
