import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import Image from 'next/image'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'ByFurqon | Dashboard',
  description: 'dashboard page of ByFurqon',
}

async function getPosts() {
  return await prisma.post.findMany({
    take: 20,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      categories: true,
    },
    where: {
      status: true,
    },
  })
}

async function getPython() {
  return await prisma.post.findMany({
    where: {
      categories: {
        some: {
          name: {
            equals: 'Python',
          },
        },
      },
      status: true,
    },
    include: {
      categories: true,
    },
    take: 20,
  })
}

async function getJsAndTs() {
  return await prisma.post.findMany({
    where: {
      categories: {
        some: {
          name: {
            contains: 'Typescript',
          },
        },
      },
      status: true,
    },
    include: {
      categories: true,
    },
    take: 20,
  })
}

export default async function PostPage() {
  const posts = await getPosts()
  const python = await getPython()
  const typescript = await getJsAndTs()

  return (
    <main className={'container mx-auto flex flex-col gap-10'}>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>New Post</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          {posts?.map((post) => (
            <a
              href={`/post/${post.slug}`}
              key={post.id}
              className={'card w-96 border border-solid border-gray-200 flex-shrink-0'}
            >
              <Image
                width={400}
                height={400}
                src={`https://source.unsplash.com/random/400x170?${post.title.split(' ').join(',')}`}
                alt={post.title}
              />
              <div className="card-body">
                <h2 className="card-title text-ellipsis line-clamp-1">{post.title}</h2>
                <div className="card-actions justify-end">
                  <div className={'flex flex-row gap-2 w-full items-center'}>
                    <div className={'flex-1 flex gap-4'}>
                      {post?.categories.map((category, index) => {
                        if (index < 2) {
                          return (
                            <div key={category.name} className={'badge badge-neutral rounded-md'}>
                              {category.name}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>Python</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          {python?.map((post) => (
            <a
              href={`/post/${post.slug}`}
              key={post.id}
              className={'card w-96 border border-solid border-gray-200 flex-shrink-0'}
            >
              <Image
                width={400}
                height={400}
                src={`https://source.unsplash.com/random/400x170?${post.title.split(' ').join(',')}`}
                alt={post.title}
              />
              <div className="card-body">
                <h2 className="card-title text-ellipsis line-clamp-1">{post.title}</h2>
                <div className="card-actions justify-end">
                  <div className={'flex flex-row gap-2 w-full items-center'}>
                    <div className={'flex-1 flex gap-4'}>
                      {post.categories.map((category, index) => {
                        if (index < 2) {
                          return (
                            <div key={category.name} className={'badge badge-neutral rounded-md'}>
                              {category.name}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>Typescript & Javascript</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          {typescript?.map((post) => (
            <a
              href={`/post/${post.slug}`}
              key={post.id}
              className={'card w-96 border border-solid border-gray-200 flex-shrink-0'}
            >
              <Image
                width={400}
                height={400}
                src={`https://source.unsplash.com/random/400x170?${post.title.split(' ').join(',')}`}
                alt={post.title}
              />
              <div className="card-body">
                <h2 className="card-title text-ellipsis line-clamp-1">{post.title}</h2>
                <div className="card-actions justify-end">
                  <div className={'flex flex-row gap-2 w-full items-center'}>
                    <div className={'flex-1 flex gap-4'}>
                      {post.categories.map((category, index) => {
                        if (index < 2) {
                          return (
                            <div key={category.name} className={'badge badge-neutral rounded-md'}>
                              {category.name}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
