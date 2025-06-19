"use client"

import { TQuestion } from '@/lib/schema/tests.schema'
import { QuestionViewer } from '@/components/reusable/QuestionViewer'
import React from 'react'
import GenerateTestPDF from '@/app/questions/create/[testid]/_components/GenerateTestPDF'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from '@/components/ui/card'

type Props = {
    questions: TQuestion[]
    testName: string
}

const TestQuestoinsAndAnswersViewer = (props: Props) => {
    const { questions, testName } = props
    return (
        <Card className="w-full bg-white shadow-2xl p-8 mt-10 rounded-2xl border-t-8 border-purple-500"> {/* Applied the new styling here */}
            <Accordion type="single" collapsible className="w-full">
                {/* Removed border-b from AccordionItem to remove the line below the trigger */}
                <AccordionItem value="test-details">
                    <AccordionTrigger className="text-black hover:no-underline text-lg font-bold">
                        Click To View Answers
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="flex flex-col gap-4 mt-4">
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default TestQuestoinsAndAnswersViewer