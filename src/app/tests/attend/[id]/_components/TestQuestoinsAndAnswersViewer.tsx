import { TQuestion, TSingleCustomTestWithQuestions } from '@/lib/schema/tests.schema'
import { QuestionViewer } from '@/components/reusable/QuestionViewer'
import React from 'react'
import GenerateTestPDF from '@/app/questions/create/[testid]/_components/GenerateTestPDF'

type Props = {
  questions: TQuestion[]
  testName: string
}


const TestQuestoinsAndAnswersViewer = (props: Props) => {
  const { questions, testName } = props
  return (
    <div className={`w-full flex flex-col gap-4 `}>
      {/* <div className="flex gap-2">
          <PDFDownloadButton 
            questions={questions} 
            testName={testName} 
            compact={true} 
          />
        </div> */}

      <GenerateTestPDF
        questions={questions}
        testName={testName}
      />
      {questions && questions.map((question, index) => (
        <div key={index} className='h-fit'>
          <QuestionViewer index={index} question={question} />
        </div>
      ))}
    </div>
  )
}

export default TestQuestoinsAndAnswersViewer