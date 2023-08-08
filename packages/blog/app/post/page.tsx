import { Metadata } from 'next'
import Post from './post'

export const metadata: Metadata = {
  title: 'ByFurqon | Post',
  description: 'collection post',
}
export default function PostPage() {
  return (
    <>
      <Post />
    </>
  )
}
