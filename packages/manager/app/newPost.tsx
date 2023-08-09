'use client'

import React, { useRef, useState } from 'react'

export default function NewPost() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState('')
  const handleOnClickCreate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
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
            <div className={'btn btn-primary rounded-md'} onClick={(e) => {}}>Create</div>
            <button className={'btn rounded-md'}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  )
}
