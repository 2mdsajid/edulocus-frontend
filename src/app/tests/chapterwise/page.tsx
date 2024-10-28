
import React from 'react'
import { getTotalQuestionsPerSubjectAndChapter } from './_components/actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import ChapterwiseMainPage from './_components/ChapterwiseMainPage'

type Props = {}

const page = async (props: Props) => {

  const {
    data: totalQuestionsPerSubjectAndChapterData,
    message: totalQuestionsPerSubjectAndChapterMessage
  } = await getTotalQuestionsPerSubjectAndChapter()
  if (!totalQuestionsPerSubjectAndChapterData) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectAndChapterMessage} />
  }


  return (
    <div className='w-full'>
      <ChapterwiseMainPage data={totalQuestionsPerSubjectAndChapterData} />
    </div>
  )
}

export default page
