import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) notFound()

  const { data: related } = await supabase
    .from('articles')
    .select('id,title,slug,category,excerpt,published_at')
    .eq('status', 'published')
    .eq('category', article.category)
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(3)

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/research" className="text-accent text-sm hover:underline mb-6 inline-block">&larr; Back to Research</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          <div className="mb-6">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">{article.category}</span>
            {date && <span className="text-sm text-gray-400 ml-3">{date}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">{article.title}</h1>
          <p className="text-sm text-gray-500 mb-8">By {article.author}</p>
          {article.cover_image_url && (
            <img src={article.cover_image_url} alt={article.title} className="w-full rounded-xl mb-8" />
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
        </article>
        <aside className="lg:col-span-1">
          <h3 className="font-semibold text-navy mb-4">Related Articles</h3>
          {related && related.length > 0 ? (
            <div className="flex flex-col gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/research/${r.slug}`} className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-xs text-gray-400">{r.category}</span>
                  <h4 className="font-medium text-sm text-navy mt-1">{r.title}</h4>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">More articles coming soon.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
