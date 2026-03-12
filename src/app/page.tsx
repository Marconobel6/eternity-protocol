import Link from "next/link"
import { supabase } from "@/lib/supabase"
import ArticleCard from "@/components/ArticleCard"
import EmailSignup from "@/components/EmailSignup"
import TopicCard from "@/components/TopicCard"

export const revalidate = 60

export default async function Home() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: true })
    .limit(3)

  const topics = [
    { title: "GLP-1 Weight Loss", description: "Semaglutide, tirzepatide, and the science of metabolic regulation.", icon: "\u2696\uFE0F", href: "/research?cat=glp-1" },
    { title: "Peptides", description: "BPC-157, thymosin, and peptide therapy protocols.", icon: "\uD83E\uDDEC", href: "/research?cat=peptides" },
    { title: "Longevity Science", description: "Rapamycin, NAD+, senolytics, and anti-aging research.", icon: "\uD83D\uDD2C", href: "/research?cat=longevity" },
    { title: "Metabolic Health", description: "Body composition, insulin sensitivity, and biohacking.", icon: "\uD83D\uDCAA", href: "/research?cat=biohacking" },
  ]

  return (
    <div>
      {/* Hero — clean white, forhers style */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="text-[42px] md:text-[64px] font-normal tracking-[-0.05em] leading-[1.05] text-[rgba(0,0,0,0.88)] max-w-2xl">
          The science of<br />living longer
        </h1>
        <p className="text-[16px] md:text-[18px] text-[rgba(0,0,0,0.45)] max-w-lg mt-5 mb-8 leading-relaxed">
          Evidence-based research on peptides, GLP-1, and longevity science. No hype — just data.
        </p>
        <div className="flex gap-3">
          <Link href="/research" className="px-6 py-3 bg-forest text-white text-[14px] font-medium rounded-full hover:bg-forest-light transition-colors">
            Explore Research
          </Link>
          <Link href="/community" className="px-6 py-3 bg-sage-bg text-forest text-[14px] font-medium rounded-full hover:bg-sage-light/40 transition-colors">
            Join Community
          </Link>
        </div>
      </section>

      {/* Bento Topic Grid */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map(t => <TopicCard key={t.title} {...t} />)}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[28px] md:text-[36px] font-normal tracking-[-0.04em] text-[rgba(0,0,0,0.88)]">Article Knowledge Base</h2>
            <Link href="/research" className="text-[14px] font-medium text-forest hover:text-forest-light transition-colors flex items-center gap-1">
              View all <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-[20px]">
              <p className="text-[rgba(0,0,0,0.45)] mb-1">Research articles launching soon.</p>
              <p className="text-[13px] text-[rgba(0,0,0,0.3)]">Subscribe below to get notified.</p>
            </div>
          )}
        </div>
      </section>

      {/* Email Signup */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <EmailSignup />
      </section>
    </div>
  )
}
