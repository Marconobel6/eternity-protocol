import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPeptideArticle } from '@/lib/peptideSeries'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function PeptideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getPeptideArticle(slug)

  if (!article) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/peptide-starter" className="text-accent text-sm hover:underline">&larr; Back to series</Link>
      <div className="mt-6">
        <p className="text-sm text-accent font-semibold tracking-wide uppercase">Day {article.seriesDay}</p>
        <h1 className="text-3xl font-bold text-navy mt-2 mb-4">{article.title}</h1>
        {article.excerpt && <p className="text-gray-500 mb-6">{article.excerpt}</p>}
        <article className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>
    </div>
  )
}
