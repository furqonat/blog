'use client'

import { post } from '@prisma/client'
import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import CreatableSelect from 'react-select/creatable'

type Props = {
  onSave?: () => void
  post: {
    categories: {
      id: string
      name: string
    }[]
  } & post
}

type SelectOptions = {
  value: string
  label: string
}
export default function PageClient(props: Props) {
  const { post } = props
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState<string | undefined | null>(post.content)
  const [categoryValue, setCategoryValue] = useState<SelectOptions[]>([])

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTitle(value)
  }

  useEffect(() => {
    const options = post?.categories?.map((item) => {
      return {
        value: item.name,
        label: item.name,
      }
    })
    setCategoryValue(options)
  }, [post?.categories])

  return (
    <main className={styles.main}>
      <div className={'flex flex-col w-full gap-10'}>
        <div />
        <div className={'flex gap-5 w-full xs:flex-col sm:flex-col md:flex-col'}>
          <div className={'flex-1'}>
            <input
              className={'input input-bordered w-full rounded-md'}
              placeholder={'Post title'}
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <div className={'flex gap-5 justify-center'}>
            <button
              className={'btn btn-primary rounded-md'}
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              Publish
            </button>
            <button
              className={
                'btn btn-neutral bg-gray-200 text-black border-gray-200 border-solid border hover:bg-gray-100 rounded-md'
              }
            >
              Draft
            </button>
          </div>
        </div>
        <div className={'grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5'}>
          <div className={'col-span-2'}>
            <MDEditor value={`${content}`} onChange={(value) => setContent(value)} preview={'edit'} overflow={false} />
          </div>
          <div>
            <div className={'border-gray-200 border border-solid p-4 flex flex-col gap-5 rounded-sm'}>
              <h3 className={'text-xl'}>Category</h3>
              <CreatableSelect
                placeholder={'Add category or create new category'}
                value={categoryValue}
                options={categoryValue}
                isMulti={true}
                onChange={(value) => {
                  setCategoryValue(value as unknown as SelectOptions[])
                }}
              />
              <div />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}