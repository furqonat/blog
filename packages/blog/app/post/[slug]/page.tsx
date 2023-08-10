import { PrismaClient } from '@prisma/client'
import { marked } from 'marked'
import moment from 'moment'
import { Metadata, ResolvingMetadata } from 'next'

const prisma = new PrismaClient()

type Props = {
  params: {
    slug: string
  }
}
export const revalidate = 30
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
  })

  return {
    title: post?.title,
    openGraph: {
      images: [`https://source.unsplash.com/random/400x170?${post?.title?.split(' ').join(',')}`],
    },
  }
}
export default async function Post({ params }: Props) {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
  })

  return (
    <main className={'container mx-auto'}>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>
            <a href={'/post'}>Post</a>
          </li>
          <li>{post?.title}</li>
        </ul>
      </div>
      <article className={'prose'}>
        <div>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            referrerPolicy={'no-referrer'}
            src={'https://source.unsplash.com/random/400x170?tech,code,webdesign,backend,frontend'}
            alt={'banner image'}
            width={600}
            height={100}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
        <h1>{post?.title}</h1>
        <p>{moment(post?.created_at).fromNow()}</p>
        <div className={'text-justify'} dangerouslySetInnerHTML={{ __html: marked.parse(`${post?.content}`) }} />
      </article>
    </main>
  )
}
