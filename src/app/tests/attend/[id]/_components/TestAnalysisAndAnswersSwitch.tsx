import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import { QuestionViewer } from "@/components/reusable/QuestionViewer"
import { TQuestion } from "@/app/tests/_components/schema"


type Props = {
    children: React.ReactNode
    questions: TQuestion[]
}

const TestAnalysisAndAnswersSwitch = (props: Props) => {
    const { children, questions } = props
    return (
        <div>
            <Tabs defaultValue="analysis" className="w-full my-5">
                <TabsList className='bg-none bg-primary dark:bg-dark-primary mb-3 sticky top-16 z-100'>
                    <TabsTrigger className='text-xl font-semibold' value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger className='text-xl font-semibold' value="answers">Answers</TabsTrigger>
                </TabsList>
                <TabsContent value="analysis" className='w-full'>
                    {/* this is to pass the analysis as children of this body */}
                    {children}
                </TabsContent>
                <TabsContent value="answers" className='w-full'>
                    {/* this is to pass thw questions as props to render questions */}
                    <div className={`w-full flex flex-col gap-4 `}>
                        {questions && questions.map((question, index) => (
                            <div key={index} className='h-fit'>
                                <QuestionViewer index={index} question={question} />
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TestAnalysisAndAnswersSwitch