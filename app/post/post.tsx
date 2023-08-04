'use client'

import { Post } from '@iofel/types'
import { htmlText } from '@iofel/utils'
import { marked } from 'marked'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

export default function Post() {
  const [posts, setPost] = useState<Post[] | null>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [take] = useState(5)
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    fetch(`/api?take=${take}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data)
        setCount(Number(data.total))
      })
  }, [take, skip])

  return (
    <main className={'container mx-auto'}>
      <section className={'flex flex-col gap-5'}>
        {posts?.map((post) => (
          <div
            key={post.id}
            className={
              'card border border-gray-200 border-solid lg:card-side xl:card-side xxl:card-side'
            }
          >
            <Image
              width={400}
              height={400}
              src={`https://source.unsplash.com/random/400x170?${post.title
                .split(' ')
                .join(',')}`}
              alt={post.title}
            />
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className={'text-ellipsis line-clamp-1'}>
                {htmlText(marked.parse(`${post?.content}`))}
              </p>
              <div className="card-actions justify-end">
                <div className={'flex flex-row gap-6 w-full items-center'}>
                  <div
                    className={
                      'flex-1 flex gap-4 xs:flex-col sm:flex-col flex-row'
                    }
                  >
                    {post?.categories?.map((category, index) => {
                      if (index < 2) {
                        return (
                          <div
                            key={category.name}
                            className={'badge badge-neutral rounded-md'}
                          >
                            {category.name}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                  <a
                    href={`post/${post.slug}`}
                    className="btn btn-primary rounded-md"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <ResponsivePagination
          current={page}
          total={Math.round(count / take)}
          onPageChange={(currentPage) => {
            setPage(currentPage)
            setSkip((currentPage - 1) * take)
          }}
          activeItemClassName={'bg-black text-white rounded-md'}
          pageLinkClassName={'p-4 rounded-md'}
          disabledItemClassName={'text-gray-400'}
        />
      </section>
    </main>
  )
}
