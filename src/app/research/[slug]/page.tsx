import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

export const revalidate = 60

const categoryColors: Record<string, string> = {
  peptides: "bg-[#e8efe8] text-[#3d6454]",
  "glp-1": "bg-[#eee9e0] text-[#7a6840]",
  longevity: "bg-[#ebe4f0] text-[#5a4870]",
  biohacking: "bg-[#fce8db] text-[#8a5c3a]",
  general: "bg-[#f0f0f0] text-[#555]",
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!article) notFound()

  const { data: related } = await supabase
    .from("articles")
    .select("id,title,slug,category,excerpt,published_at")
    .eq("status", "published")
    .eq("category", article.category)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(3)

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : ""
  const color = categoryColors[article.category] || categoryColors.general

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-16">
      <Link href="/research" className="text-[14px] text-forest hover:text-forest-light transition-colors mb-8 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Research
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
        <article className="lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <span className={`text-[12px] font-medium px-3 py-1 rounded-full ${color}`}>{article.category}</span>
            {date && <span className="text-[13px] text-[rgba(0,0,0,0.35)]">{date}</span>}
          </div>
          <h1 className="text-[32px] md:text-[42px] font-normal tracking-[-0.04em] text-[rgba(0,0,0,0.88)] mb-4 leading-[1.1]">{article.title}</h1>
          <p className="text-[14px] text-[rgba(0,0,0,0.4)] mb-8">By {article.author}</p>
          {article.cover_image_url && (
            <img src={article.cover_image_url} alt={article.title} className="w-full rounded-[20px] mb-10" />
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br />") }} />
        </article>
        <aside className="lg:col-span-1">
          <h3 className="text-[14px] font-medium text-[rgba(0,0,0,0.4)] uppercase tracking-wider mb-5">Related Articles</h3>
          {related && related.length > 0 ? (
            <div className="flex flex-col gap-3">
              {related.map(r => (
                <Link key={r.id} href={`/research/${r.slug}`} className="block p-5 bg-sage-bg/50 rounded-[16px] hover:bg-sage-bg transition-colors">
                  <span className="text-[12px] text-[rgba(0,0,0,0.35)]">{r.category}</span>
                  <h4 className="text-[15px] font-medium text-forest mt-1.5 leading-snug">{r.title}</h4>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-[rgba(0,0,0,0.35)]">More articles coming soon.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
