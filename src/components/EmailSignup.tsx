'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const { error } = await supabase.from('email_subscribers').insert({ email, source: 'website' })
    if (error) {
      setStatus(error.code === '23505' ? 'success' : 'error')
    } else {
      setStatus('success')
    }
    setEmail('')
  }

  return (
    <section className="bg-navy rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Join the Eternity Community</h2>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">Get weekly research summaries on peptides, GLP-1, and longevity science. No spam.</p>
      {status === 'success' ? (
        <p className="text-green-400 font-medium">You&apos;re in! Watch your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" disabled={status === 'loading'}
            className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-sm mt-2">Something went wrong. Try again.</p>}
    </section>
  )
}
