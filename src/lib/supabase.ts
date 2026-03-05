import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  tags: string[]
  status: string
  cover_image_url: string | null
  author: string
  seo_title: string | null
  seo_description: string | null
  published_at: string | null
  created_at: string
  metadata: Record<string, unknown>
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price_cents: number
  currency: string
  category: string | null
  images: string[]
  in_stock: boolean
  featured: boolean
  created_at: string
}
