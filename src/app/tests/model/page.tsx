import React from 'react'
import { TTypeOfTest } from '@/app/tests/_components/schema'
import { getAllTestsByType } from './_components/actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import TestList from './_components/TestList'

type Props = {

}

const page = async (props: Props) => {

  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('MODEL')
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Available Tests</h1>
      <TestList tests={customTestsData} />
    </div>
  )
}

export default page