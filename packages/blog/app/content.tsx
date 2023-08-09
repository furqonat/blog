'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type ContentProps = {
  category?: string
}

export default function Content(props: ContentProps) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (props?.category) {
      fetch(`/api?take=${20}&skip=${0}&category=${props.category}`)
        .then((resp) => {
          resp
            .json()
            .then((data) => {
              setPosts(data.data)
              setLoading(false)
            })
            .catch(() => {
              setLoading(false)
            })
        })
        .catch(() => setLoading(false))
    } else {
      fetch(`/api?take=${20}&skip=${0}`)
        .then((resp) => {
          resp
            .json()
            .then((data) => {
              setPosts(data.data)
              setLoading(false)
            })
            .catch(() => setLoading(false))
        })
        .catch(() => setLoading(false))
    }
  }, [props?.category])

  if (loading) {
    return (
      <>
        {Array.from(Array(20).keys()).map((item) => {
          return (
            <div key={item} role="status" className="card w-96 border border-solid border-gray-200 flex-shrink-0">
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
        })}
      </>
    )
  }
  return (
    <>
      {posts?.map((post: any) => (
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
                  {post?.categories.map((category: any, index: any) => {
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
    </>
  )
}
