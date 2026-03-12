import Link from "next/link"
import type { Article } from "@/lib/supabase"

const categoryColors: Record<string, string> = {
  peptides: "bg-[#e8efe8] text-[#3d6454]",
  "glp-1": "bg-[#eee9e0] text-[#7a6840]",
  longevity: "bg-[#ebe4f0] text-[#5a4870]",
  biohacking: "bg-[#fce8db] text-[#8a5c3a]",
  general: "bg-[#f0f0f0] text-[#555]",
}

export default function ArticleCard({ article }: { article: Article }) {
  const color = categoryColors[article.category] || categoryColors.general
  const date = article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""

  return (
    <Link href={`/research/${article.slug}`} className="group block bg-white rounded-[20px] overflow-hidden hover:shadow-xl transition-all duration-500 border border-black/[0.04]">
      {article.cover_image_url ? (
        <div className="aspect-[16/10] bg-sage-bg overflow-hidden">
          <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-sage-bg to-cream flex items-center justify-center">
          <span className="text-4xl opacity-30">🧬</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`text-[12px] font-medium px-3 py-1 rounded-full ${color}`}>{article.category}</span>
          {date && <span className="text-[12px] text-[rgba(0,0,0,0.35)]">{date}</span>}
        </div>
        <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.88)] group-hover:text-forest transition-colors mb-2 leading-snug line-clamp-2">{article.title}</h3>
        {article.excerpt && <p className="text-[14px] text-[rgba(0,0,0,0.45)] leading-relaxed line-clamp-3">{article.excerpt}</p>}
      </div>
    </Link>
  )
}
