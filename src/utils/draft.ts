import { getCollection } from 'astro:content'
import type { PostEntry } from '@/types'

/**
 * Get all posts (Markdown and HTML), filtering out posts whose IDs start with _
 */
export async function getFilteredPosts(): Promise<PostEntry[]> {
  const [mdPosts, htmlPosts] = await Promise.all([
    getCollection('posts'),
    getCollection('htmlPosts')
  ])
  return [
    ...mdPosts.filter((post: PostEntry) => !post.id.startsWith('_')),
    ...htmlPosts.filter((post: PostEntry) => !post.id.startsWith('_'))
  ]
}

/**
 * Get all posts sorted by publication date, filtering out posts whose IDs start with _
 */
export async function getSortedFilteredPosts(): Promise<PostEntry[]> {
  const posts = await getFilteredPosts()
  return posts.sort(
    (a: PostEntry, b: PostEntry) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}
