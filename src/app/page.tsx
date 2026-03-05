import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/ArticleCard'
import EmailSignup from '@/components/EmailSignup'
import TopicCard from '@/components/TopicCard'

export const revalidate = 60

export default async function Home() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  const topics = [
    { title: 'GLP-1 Weight Loss', description: 'Semaglutide, tirzepatide, and the science of metabolic regulation.', icon: '⚖️', href: '/research?cat=glp-1' },
    { title: 'Peptides', description: 'BPC-157, thymosin, and peptide therapy protocols.', icon: '🧬', href: '/research?cat=peptides' },
    { title: 'Longevity Science', description: 'Rapamycin, NAD+, senolytics, and anti-aging research.', icon: '🔬', href: '/research?cat=longevity' },
    { title: 'Metabolic Health', description: 'Body composition, insulin sensitivity, and biohacking.', icon: '💪', href: '/research?cat=biohacking' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-blue-900 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">The Science of<br />Living Longer</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">Evidence-based research on peptides, GLP-1 weight loss, and longevity science. Join a global community of researchers and biohackers.</p>
          <div className="flex gap-4">
            <Link href="/research" className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Explore Research</Link>
            <Link href="/community" className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors">Join Community</Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Topics */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">Research Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map(t => <TopicCard key={t.title} {...t} />)}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Latest Research</h2>
            <Link href="/research" className="text-accent text-sm font-medium hover:underline">View all →</Link>
          </div>
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-2">Research articles launching soon.</p>
              <p className="text-sm text-gray-400">Subscribe below to get notified.</p>
            </div>
          )}
        </section>

        {/* Email Signup */}
        <section className="py-16">
          <EmailSignup />
        </section>
      </div>
    </div>
  )
}
