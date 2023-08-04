export * from './supabase'

export interface Post {
  id: string
  title: string
  slug: string
  content: string | null
  created_at: string
  categories: [
    {
      name: string
      id: string
    }
  ] | null
}