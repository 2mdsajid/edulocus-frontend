import { TQuestion } from '@/lib/schema/tests.schema'
import { QuestionViewer } from '@/components/reusable/QuestionViewer'
import React from 'react'

type Props = {
  questions: TQuestion[]
}


const TestQuestoinsAndAnswersViewer = (props: Props) => {
  const { questions } = props
  return (
    <div className={`w-full flex flex-col gap-4 `}>
      {questions && questions.map((question, index) => (
        <div key={index} className='h-fit'>
          <QuestionViewer index={index} question={question} />
        </div>
      ))}
    </div>
  )
}

export default TestQuestoinsAndAnswersViewer