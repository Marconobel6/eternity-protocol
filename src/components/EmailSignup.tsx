"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    const { error } = await supabase.from("email_subscribers").insert({ email, source: "website" })
    if (error) {
      setStatus(error.code === "23505" ? "success" : "error")
    } else {
      setStatus("success")
    }
    setEmail("")
  }

  return (
    <section className="bg-forest rounded-[24px] p-10 md:p-16 text-center">
      <h2 className="text-[28px] md:text-[36px] font-normal tracking-[-0.04em] text-white mb-3">Stay ahead of the science</h2>
      <p className="text-[15px] text-white/50 mb-8 max-w-md mx-auto leading-relaxed">Weekly research summaries on peptides, GLP-1, and longevity. No spam, no hype — just data.</p>
      {status === "success" ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-sage flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
          <p className="text-sage-light font-medium text-[15px]">You&apos;re in. Watch your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sage/50 text-[15px]"
          />
          <button type="submit" disabled={status === "loading"}
            className="px-7 py-3.5 bg-white text-forest font-medium rounded-full hover:bg-cream transition-colors disabled:opacity-50 text-[14px]">
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && <p className="text-red-300 text-[13px] mt-3">Something went wrong. Try again.</p>}
    </section>
  )
}
