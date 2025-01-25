import React from 'react'
import ErrorPage from '@/components/reusable/ErrorPage'
import TestList from './_components/TestList'
import { getAllTestsByType } from '../_components/actions'

type Props = {

}

const page = async (props: Props) => {

  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('MODEL')
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-bold">Available Tests</h1> */}
      <TestList tests={customTestsData} />
    </div>
  )
}

export default page