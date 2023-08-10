'use client'

import Image from 'next/image'
import moment from 'moment'
import NewPost from './newPost'
import Publish from './publish'
import Draft from './draft'
import { useEffect, useState } from 'react'

export default function Index() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/post')
      .then((e) => e.json())
      .then((resp) => {
        setPosts(resp)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className={'container mx-auto flex flex-col min-h-screen justify-center min-w-full items-center'}>
        <span className={'loading loading-spinner'}></span>
      </main>
    )
  }
  return (
    <main className={'container mx-auto flex flex-col gap-10'}>
      <div />
      <section className={'flex flex-col gap-5'}>
        <div className={'flex w-full items-center'}>
          <h1 className={'text-4xl font-bold flex-1'}>Posts</h1>
          <NewPost />
        </div>
        {posts?.map((item: any) => {
          return (
            <a
              href={`/post/${item.id}`}
              className={
                'card border border-gray-200 border-solid lg:card-side xl:card-side xxl:card-side hover:cursor-pointer hover:shadow-md duration-150 rounded-md'
              }
              key={item.id}
            >
              <Image
                width={400}
                height={400}
                src={`https://source.unsplash.com/random/400x170?${item.title.split(' ').join(',')}`}
                alt={item.title}
              />
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className={'text-ellipsis line-clamp-1'}>{moment(item.created_at).fromNow()}</p>
                <div className={'card-actions'}>
                  <div className={'flex-1 flex gap-4 xs:flex-col sm:flex-col flex-row'}>
                    {item?.categories?.map((category: any, index: number) => {
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
                  <div className={'flex'}>{!item.status ? <Publish id={item.id} /> : <Draft id={item.id} />}</div>
                </div>
              </div>
            </a>
          )
        })}
      </section>
      <div />
    </main>
  )
}
