import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const postSchema = z.object({
  title: z.string(),
  // Transform string to Date object
  pubDate: z.coerce.date(),
  image: z.string().optional(),
  section: z.string().optional()
})

const posts = defineCollection({
  // Load Markdown and MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () => postSchema
})

// Custom loader for HTML posts: each post is a folder with index.html + meta.json
const htmlPosts = defineCollection({
  loader: {
    name: 'html-posts-loader',
    async load({ store, config }) {
      store.clear()
      const baseDir = fileURLToPath(new URL('./src/content/html-posts', config.root))

      if (!existsSync(baseDir)) return

      const entries = readdirSync(baseDir, { withFileTypes: true }).filter((d) => d.isDirectory())

      for (const entry of entries) {
        // Skip draft folders (starting with _)
        if (entry.name.startsWith('_')) continue

        const htmlPath = join(baseDir, entry.name, 'index.html')
        const metaPath = join(baseDir, entry.name, 'meta.json')

        if (!existsSync(htmlPath) || !existsSync(metaPath)) continue

        let meta: Record<string, unknown>
        try {
          meta = JSON.parse(readFileSync(metaPath, 'utf-8'))
        } catch (err) {
          throw new Error(`Failed to parse meta.json for html-post "${entry.name}" at ${metaPath}: ${err}`)
        }
        const html = readFileSync(htmlPath, 'utf-8')

        store.set({
          id: entry.name,
          data: {
            ...meta,
            // Coerce pubDate string to Date (schema coercion doesn't run on custom loader data)
            pubDate: new Date(meta.pubDate as string)
          },
          body: html
        })
      }
    }
  },
  schema: postSchema
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

export const collections = { posts, htmlPosts, about }
