"use client"

import { TBaseOption, TQuestion } from "@/app/tests/_components/schema"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, ParsedElement } from "@/lib/utils"

type Props = {
    question: TQuestion
    index: number
    token?: string
}

export const QuestionViewer = (props: Props) => {
    const { question, index } = props

    const getStatusColor = () => {
        if (!question.uans) return "text-color7"
        return question.uans === question.answer ? "text-green-500" : "text-red-500"
    }

    const getOptionStyle = (option: string) => {
        if (question.answer === option) return "border-black bg-green-200"
        if (question.uans === option && question.uans !== question.answer) return "border-red-500 bg-red-200"
        return "border-color5"
    }

    return (
        <Card className="w-full bg-primary shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className=" text-lg font-bold">Question {index + 1}</CardTitle>
                <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={cn("font-semibold", getStatusColor())}>
                        {!question.uans ? "Unattempted" : question.uans === question.answer ? "Correct" : "Incorrect"}
                    </Badge>
                    <Badge variant="outline" className="">
                        {((question.timetaken || 0) / 1000).toFixed(1)}s
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="text-md font-medium mb-4">{question.question}</div>
                <div className="space-y-1">
                    {['a', 'b', 'c', 'd'].map((option) => (
                        <div key={option} className={cn("flex items-center space-x-2 p-2 rounded-md transition-colors", getOptionStyle(option))}>
                            {/* <RadioGroupItem value={option} id={`${question.id}_${option}`} className="" /> */}
                            <Label htmlFor={`${question.id}_${option}`} className="flex-grow cursor-pointer ">
                                {/* {question.options[option as keyof TBaseOption]} */}
                                <div className="flex gap-2 items-center">
                                    <p className="flex gap-1  text-gray-800 dark:text-gray-200">
                                        {option} <span>)</span>
                                    </p>
                                    <p>{ParsedElement(question.options[option as keyof TBaseOption])}</p>
                                </div>
                            </Label>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-color1 rounded-md">
                    <h3 className=" font-semibold mb-2">Explanation:</h3>
                    <p className="">{question.explanation}</p>
                </div>
            </CardContent>
        </Card>
    )
}