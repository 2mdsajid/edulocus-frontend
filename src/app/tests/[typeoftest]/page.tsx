import React from 'react'
import { TTypeOfTest } from '@/app/tests/_components/schema'
import { getAllTestsByType } from './_components/actions'
import ErrorPage from '@/components/ErrorPage'
import TestList from './_components/TestList'

type Props = {
  params: {
    typeoftest: string
  }
}

const page = async (props: Props) => {
  const typeoftest  = props.params.typeoftest.toUpperCase() as TTypeOfTest

  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType(typeoftest)
  console.log("🚀 ~ page ~ customTestsData:", customTestsData)
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Available Tests</h1>
      <TestList tests={customTestsData} typeoftest={typeoftest} />
    </div>
  )
}

export default page