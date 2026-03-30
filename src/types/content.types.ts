import type { CollectionEntry } from 'astro:content'

// Reading time interface
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

// TOC item interface
export interface TOCItem {
  level: number
  text: string
  id: string
  index: number
}

// Unified post entry type covering both Markdown and HTML posts
export type PostEntry = CollectionEntry<'posts'> | CollectionEntry<'htmlPosts'>

// PostList component props interface
export interface PostListProps {
  posts: PostEntry[]
}
