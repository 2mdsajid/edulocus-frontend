import { QuestionViewer } from '@/components/reusable/QuestionViewer'
import { TQuestion } from '@/lib/schema/tests.schema'
import React from 'react'

type Props = {
  questions: TQuestion[]
}

const ReTestQuestionsViewer = (props: Props) => {
  const { questions } = props
  return (
    <div className='mt-10 space-y-5'>
      {questions && questions.map((question, index) => (
        <div key={index} className='h-fit space-y-4'>
          <QuestionViewer index={index} question={question} />
        </div>
      ))}
    </div>
  )
}

export default ReTestQuestionsViewer