import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 60

export default async function ResearchPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const params = await searchParams
  const category = params.cat

  let query = supabase.from('articles').select('*').eq('status', 'published').order('published_at', { ascending: false })
  if (category) query = query.eq('category', category)
  const { data: articles } = await query

  const categories = ['all', 'peptides', 'glp-1', 'longevity', 'biohacking']

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Research</h1>
      <p className="text-gray-500 mb-8">Evidence-based articles on peptides, GLP-1, longevity, and metabolic health.</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(c => (
          <a key={c} href={c === 'all' ? '/research' : `/research?cat=${c}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              (c === 'all' && !category) || c === category
                ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {c === 'glp-1' ? 'GLP-1' : c.charAt(0).toUpperCase() + c.slice(1)}
          </a>
        ))}
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="text-4xl mb-4">🔬</div>
          <h3 className="text-lg font-semibold text-navy mb-2">Research articles coming soon</h3>
          <p className="text-sm text-gray-500">We are preparing in-depth research on peptides, GLP-1, and longevity science.</p>
        </div>
      )}
    </div>
  )
}
