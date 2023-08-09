'use client'
import { marked } from 'marked'
import Image from 'next/image'
import { Post } from '../../types'
import { htmlText } from '../../utils'
import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

export default function Post() {
  const [posts, setPosts] = useState<Post[] | null>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [take] = useState(5)
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    setLoadingPosts(true)
    fetch(`/api?take=${take}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setLoadingPosts(false)
        setPosts(data.data)
        setCount(Number(data.total))
      })
      .catch(() => {
        setLoadingPosts(false)
      })
  }, [take, skip])

  return (
    <main className={'container mx-auto'}>
      <section className={'flex flex-col gap-5'}>
        {loadingPosts
          ? Array.from(Array(5).keys()).map((item) => {
              return (
                <div
                  key={item}
                  role="status"
                  className="card border border-gray-200 border-solid lg:card-side xl:card-side xxl:card-side"
                >
                  <div className="flex items-center justify-center h-48 w-[400px]">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full card-body">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              )
            })
          : posts?.map((post) => (
              <div
                key={post.id}
                className={'card border border-gray-200 border-solid lg:card-side xl:card-side xxl:card-side'}
              >
                <Image
                  width={400}
                  height={400}
                  src={`https://source.unsplash.com/random/400x170?${post.title.split(' ').join(',')}`}
                  alt={post.title}
                />
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p className={'text-ellipsis line-clamp-1'}>{htmlText(marked.parse(`${post?.content}`))}</p>
                  <div className="card-actions justify-end">
                    <div className={'flex flex-row gap-6 w-full items-center'}>
                      <div className={'flex-1 flex gap-4 xs:flex-col sm:flex-col flex-row'}>
                        {post?.categories?.map((category, index) => {
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
                      <a href={`post/${post.slug}`} className="btn btn-primary rounded-md">
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
