import React from 'react'
import ErrorPage from '@/components/reusable/ErrorPage'
import TestList from './_components/TestList'
import { getAllTestsByType } from '@/lib/actions/tests.actions'
import { getUserSession } from '@/lib/auth/auth'
import { constructMetadata } from '@/lib/data'


export const metadata = constructMetadata({
  title: "Edulocus | Model Exams",
  description: "Simulate exam day with our realistic model tests."
});


type Props = {

}

const page = async (props: Props) => {

  const { data: user } = await getUserSession();
  const isUserSubscribed = user?.isSubscribed || false


  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('MODEL')
  // console.log(customTestsData)
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-bold">Available Tests</h1> */}
      <TestList tests={customTestsData} isUserSubscribed={isUserSubscribed}  />
    </div>
  )
}

export default page