export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          category: Json
          content: string | null
          created_at: string
          id: number
          slug: string
          title: string
        }
        Insert: {
          category?: Json
          content?: string | null
          created_at?: string
          id?: number
          slug: string
          title: string
        }
        Update: {
          category?: Json
          content?: string | null
          created_at?: string
          id?: number
          slug?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
