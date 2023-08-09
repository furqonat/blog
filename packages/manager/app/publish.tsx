'use client'

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ButtonProps = {
  id: string
}
export default function Publish(props: ButtonProps) {
  const { id } = props

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const updatePostStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingUpdate(true)
    fetch(`/api/post/${id}`, { method: 'PUT', body: JSON.stringify({ status: true }) })
      .then(async (resp) => {
        console.log(await resp.json())
        if (resp.ok) {
          setLoadingUpdate(false)
          if (!toast.isActive('success')) {
            toast.success('Success update status', { toastId: 'success' })
          }
        } else {
          setLoadingUpdate(false)
          if (!toast.isActive('error')) {
            toast.error('Error update status', { toastId: 'error' })
          }
        }
      })
      .catch((e) => {
        console.log(e)
        setLoadingUpdate(false)
        if (!toast.isActive('error')) {
          toast.error('Error update status', { toastId: 'error' })
        }
      })
  }
  return (
    <>
      <button className={'btn btn-primary rounded-md'} onClick={updatePostStatus}>
        {loadingUpdate ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        )}
        Publish
      </button>
      <ToastContainer />
    </>
  )
}
