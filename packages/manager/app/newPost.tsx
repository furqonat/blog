'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPost() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnClickCreate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
<<<<<<< HEAD
    setLoading(true)
    fetch('/api/post', { method: 'POST', body: JSON.stringify({ title: title }) })
      .then(async (resp) => {
        dialogRef?.current?.close()
        const id = await resp.json()
        router.push(`/post/${id.id}`)
        setLoading(false)
      })
      .catch(() => setLoading(false))
=======
>>>>>>> parent of 0433bcb (Revert "dynamic page to home")
  }
  return (
    <>
      <button className={'btn btn-primary rounded-md'} onClick={() => dialogRef?.current?.showModal()}>
        New Post
      </button>
      <dialog ref={dialogRef} className={'modal'}>
        <form method={'dialog'} className={'modal-box w-full flex flex-col gap-5'}>
          <h3 className={'font-bold text-lg'}>Create New Post</h3>
          <input
            className={'input input-bordered rounded-md'}
            placeholder={'Post title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={'modal-action'}>
<<<<<<< HEAD
            <div className={'btn btn-primary rounded-md'} onClick={handleOnClickCreate}>
              {loading ? <span className={'loading loading-spinner'}></span> : null}
=======
            <div className={'btn btn-primary rounded-md'} onClick={(e) => {}}>
>>>>>>> parent of 0433bcb (Revert "dynamic page to home")
              Create
            </div>
            <button className={'btn rounded-md'}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  )
}