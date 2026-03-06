import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDir = path.join(process.cwd(), 'content/peptide-starter')

export type PeptideArticle = {
  slug: string
  title: string
  seoTitle?: string
  seoDescription?: string
  excerpt?: string
  category?: string
  tags?: string[]
  seriesDay?: number
  content: string
  html: string
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException
    if (error.code === 'ENOENT') return false
    throw err
  }
}

async function parseFile(filename: string): Promise<PeptideArticle> {
  const fullPath = path.join(contentDir, filename)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const htmlContent = processedContent.toString()

  return {
    slug: data.slug || filename.replace(/\.md$/, ''),
    title: data.title || 'Untitled',
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    excerpt: data.excerpt,
    category: data.category,
    tags: data.tags,
    seriesDay: typeof data.series_day === 'number' ? data.series_day : undefined,
    content,
    html: htmlContent,
  }
}

export async function getPeptideArticles(): Promise<PeptideArticle[]> {
  const exists = await fileExists(contentDir)
  if (!exists) return []

  const files = await fs.readdir(contentDir)
  const markdownFiles = files.filter(f => f.endsWith('.md'))
  const articles = await Promise.all(markdownFiles.map(parseFile))
  return articles.sort((a, b) => (a.seriesDay || 0) - (b.seriesDay || 0))
}

export async function getPeptideArticle(slug: string): Promise<PeptideArticle | null> {
  const articles = await getPeptideArticles()
  return articles.find(a => a.slug === slug) ?? null
}
