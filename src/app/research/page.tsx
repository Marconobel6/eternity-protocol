import { supabase } from "@/lib/supabase"
import ArticleCard from "@/components/ArticleCard"

export const revalidate = 60

export default async function ResearchPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const params = await searchParams
  const category = params.cat

  let query = supabase.from("articles").select("*").eq("status", "published").order("published_at", { ascending: true })
  if (category) query = query.eq("category", category)
  const { data: articles } = await query

  const categories = ["all", "peptides", "glp-1", "longevity", "biohacking"]

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-16">
      <h1 className="text-[36px] md:text-[48px] font-normal tracking-[-0.05em] text-[rgba(0,0,0,0.88)] mb-2">Research</h1>
      <p className="text-[16px] text-[rgba(0,0,0,0.45)] mb-10">Evidence-based articles on peptides, GLP-1, longevity, and metabolic health.</p>

      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map(c => (
          <a key={c} href={c === "all" ? "/research" : `/research?cat=${c}`}
            className={`px-5 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-300 ${
              (c === "all" && !category) || c === category
                ? "bg-forest text-white" : "bg-sage-bg text-[rgba(0,0,0,0.55)] hover:bg-sage-light/40"
            }`}>
            {c === "glp-1" ? "GLP-1" : c.charAt(0).toUpperCase() + c.slice(1)}
          </a>
        ))}
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-sage-bg/50 rounded-[20px]">
          <div className="text-4xl mb-4 opacity-40">🔬</div>
          <h3 className="text-[18px] font-medium text-forest mb-2">Research articles coming soon</h3>
          <p className="text-[14px] text-[rgba(0,0,0,0.4)]">In-depth research on peptides, GLP-1, and longevity science.</p>
        </div>
      )}
    </div>
  )
}
