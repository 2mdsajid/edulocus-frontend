import { unsubscribeEmail } from '@/lib/actions/users.actions'
import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import React from 'react'

/* bro got no time to make a new page to unsubscribe for the cold emails. please if you are a developer then kindly do not spam our mail. we'll update the page very soon */

const UnsubscribePage = async () => {
  const { data: user, message } = await getUserSession()
  if (!user) {
    redirect('/login?ru=/unsubscribe')
  }

  const { data: unsubscribed, message: unsubscribeMessage } = await unsubscribeEmail()
  if (!unsubscribed) {
    return <p>{message}</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Successfully Unsubscribed
        </h2>
        <p className="text-gray-600 mb-6">
          You have been successfully unsubscribed from our mailing list. You will no longer receive emails from us.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  )
}

export default UnsubscribePage