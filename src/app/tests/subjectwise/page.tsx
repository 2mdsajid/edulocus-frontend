
import React from 'react'
import { getTotalQuestionsPerSubject } from './_components/actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import SubjectsList from './_components/SubjectsList'

type Props = {}

const page = async (props: Props) => {

  const {
    data: totalQuestionsPerSubjectData,
    message: totalQuestionsPerSubjectMessage
  } = await getTotalQuestionsPerSubject()

  if (!totalQuestionsPerSubjectData || totalQuestionsPerSubjectData.length === 0) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectMessage} />
  }

  return (
    <div className='w-full '>
      <SubjectsList data={totalQuestionsPerSubjectData} />
    </div>
  )
}

export default page
