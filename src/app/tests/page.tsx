import React from 'react'
import { getTypesOfTests } from './_components/actions'
import ErrorPage from '@/components/ErrorPage'
import TestTypeCard from './_components/TestTypeCard'

type Props = {}

const page = async (props: Props) => {
  const { data: typeOfTestsAndDescription, message } = await getTypesOfTests()

  if (!typeOfTestsAndDescription || typeOfTestsAndDescription.length === 0) {
    return <ErrorPage errorMessage={message} />
  }

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold mb-6'>Types of Tests</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {typeOfTestsAndDescription.map((testType) => (
          <TestTypeCard
            key={testType.type}
            type={testType.type}
            description={testType.description}
            icon={testType.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default page
