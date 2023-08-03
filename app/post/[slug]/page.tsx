import { Database } from '@iofel/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Post({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: post } = await supabase
    .from('post')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle()
  return (
    <main className={'container mx-auto'}>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Post</a>
          </li>
          <li>{post?.title}</li>
        </ul>
      </div>
      <section className={'prose mx-auto'}>
        <h1>{post?.title}</h1>

        <div className={'text-justify'}>{post?.content}</div>
      </section>
    </main>
  )
}
