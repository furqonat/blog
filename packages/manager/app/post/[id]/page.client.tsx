'use client'

import { post } from '@prisma/client'
import { Editor } from 'novel'
import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './page.module.css'

type Props = {
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
  const [optionValue, setOptionvalue] = useState<SelectOptions[]>([])
  const [loadingDraft, setLoadingDraft] = useState(false)
  const [loadingPublish, setLoadingPublish] = useState(false)

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTitle(value)
  }

  const handleOnDraftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingDraft(true)
    const body = {
      title: title,
      slug: title.trim().split(' ').join('-'),
      content: content,
      status: false,
      categories: categoryValue.map((item) => {
        return { name: item.label }
      }),
    }
    fetch(`/api/post/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (resp.ok) {
          if (!toast.isActive('success')) {
            toast.success('Success update cotent', { toastId: 'success' })
            setLoadingDraft(false)
            window.location.reload()
          }
        } else {
          if (!toast.isActive('error')) {
            setLoadingDraft(false)
            toast.error('Error update content', { toastId: 'error' })
          }
        }
      })
      .catch((error) => {
        if (!toast.isActive('error')) {
          setLoadingDraft(false)
          toast.error(`Error update content ${error.toString()}`, { toastId: 'error' })
        }
      })
  }
  const handleOnPublishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingPublish(true)
    const body = {
      title: title,
      slug: title.trim().split(' ').join('-'),
      content: content,
      status: true,
      categories: categoryValue.map((item) => {
        return { name: item.label }
      }),
    }
    fetch(`/api/post/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then((resp) => {
        setLoadingPublish(false)
        if (resp.ok) {
          if (!toast.isActive('success')) {
            toast.success('Success update cotent', { toastId: 'success' })
            window.location.reload()
          }
        } else {
          if (!toast.isActive('error')) {
            toast.error('Error update content', { toastId: 'error' })
          }
        }
      })
      .catch((error) => {
        setLoadingPublish(false)
        if (!toast.isActive('error')) {
          toast.error(`Error update content ${error.toString()}`, { toastId: 'error' })
        }
      })
  }

  useEffect(() => {
    fetch('/api/category').then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json()
        const options = data?.map((item: any) => {
          return {
            value: item.name,
            label: item.name,
          }
        })
        setOptionvalue(options)
      }
    })
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
            <button className={'btn btn-primary rounded-md'} onClick={handleOnPublishClick}>
              {loadingPublish ? <span className={'loading loading-spinner'}></span> : null}
              Publish
            </button>
            <button
              onClick={handleOnDraftClick}
              className={
                'btn btn-neutral bg-gray-200 text-black border-gray-200 border-solid border hover:bg-gray-100 rounded-md'
              }
            >
              {loadingDraft ? <span className={'loading loading-spinner'}></span> : null}
              Draft
            </button>
          </div>
        </div>
        <div className={'grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5'}>
          <div className={'col-span-2'}>
            <Editor
              disableLocalStorage={true}
              defaultValue={`${content}`}
              onUpdate={(e) => {
                if (e) {
                  setContent(e?.getText())
                }
              }}
            />
          </div>
          <div>
            <div className={'border-gray-200 border border-solid p-4 flex flex-col gap-5 rounded-sm'}>
              <h3 className={'text-xl'}>Category</h3>
              <CreatableSelect
                placeholder={'Add category or create new category'}
                value={categoryValue}
                options={optionValue}
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
      <ToastContainer />
    </main>
  )
}
