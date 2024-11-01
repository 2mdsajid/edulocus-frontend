import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const Page = (props: Props) => {
  const { id: testId } = props.params

  return (
    <div className="min-h-screen flex items-center justify-center bg-color1  px-4 md:px-10 lg:px-20 xl:px-32">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-primary dark:bg-gray-800 rounded-xl shadow-md border">
        <h1 className="text-3xl font-bold text-center text-color8 dark:text-color5">
          Coming Soon
        </h1>
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Analysis, recommendation, and retake features for past tests
          </p>
        </div>
        <ul className="mt-6 space-y-2">
          <li className="flex items-center text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Detailed performance analysis
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Personalized study recommendations
          </li>
          <li className="flex items-center text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            One-click test retake option
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Page