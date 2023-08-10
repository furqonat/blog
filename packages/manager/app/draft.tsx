'use client'

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ButtonProps = {
  id: string
}
export default function Draft(props: ButtonProps) {
  const { id } = props

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const updatePostStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingUpdate(true)
    fetch(`/api/post/${id}`, { method: 'PUT', body: JSON.stringify({ status: false }) })
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
      <button className={'btn rounded-md'} onClick={updatePostStatus}>
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
          </svg>
        )}
        Draft
      </button>
      <ToastContainer />
    </>
  )
}