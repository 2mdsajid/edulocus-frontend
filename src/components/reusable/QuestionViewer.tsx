"use client"

import { TBaseOption, TQuestion } from "@/lib/schema/tests.schema"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, ParsedElement } from "@/lib/utils"
import QuestionReportDialog from "./QuestionReportDialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getGeminiExplanation } from "@/lib/actions/google.actions"
type Props = {
    question: TQuestion
    index: number
    token?: string
}

export const QuestionViewer = (props: Props) => {
    const { question, index, token } = props
    const [isGenerating, setIsGenerating] = useState(false)
    const [currentExplanation, setCurrentExplanation] = useState(question.explanation || "")

    const getStatusColor = () => {
        if (!question.uans) return "text-color7"
        return question.uans === question.answer ? "text-green-500" : "text-red-500"
    }

    const getOptionStyle = (option: string) => {
        if (question.answer === option) return "border-black bg-green-200"
        if (question.uans === option && question.uans !== question.answer) return "border-red-500 bg-red-200"
        return "border-color5"
    }

    const generateExplanation = async () => {
        try {
            // if (!token) {
            //     toast({
            //         title: "Authentication required",
            //         description: "Please login to generate explanations",
            //         variant: "destructive",
            //     })
            //     return
            // }
            setIsGenerating(true)
            const { data, message } = await getGeminiExplanation(question)
            if (!data) {
                toast({
                    title: "Error",
                    description: message || "Could not generate explanation",
                    variant: "destructive",
                })
            }
            setCurrentExplanation(data || "Could not generate explanation")
            toast({
                title: "Explanation generated",
                description: "AI has provided an explanation for this question",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate explanation. Please try again.",
                variant: "destructive",
            })
            console.error("Error generating explanation:", error)
        } finally {
            setIsGenerating(false)
        }
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
                    <QuestionReportDialog questionId={question.id} />
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="text-md font-medium mb-4">{question.question}</div>
                <div className="space-y-1">
                    {['a', 'b', 'c', 'd'].map((option) => (
                        <div key={option} className={cn("flex items-center space-x-2 p-2 rounded-md transition-colors", getOptionStyle(option))}>
                            <Label htmlFor={`${question.id}_${option}`} className="flex-grow cursor-pointer ">
                                <div className="flex gap-2 items-center">
                                    <p className="flex gap-1  text-gray-800 dark:text-gray-200">
                                        {option} <span>{`)`}</span>
                                    </p>
                                    <p>{ParsedElement(question.options[option as keyof TBaseOption])}</p>
                                </div>
                            </Label>
                        </div>
                    ))}
                </div>


                {/* explanation section -- for aiii */}
                <div className="mt-6 p-4 bg-color1 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Explanation:</h3>
                        {(
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={generateExplanation}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate AI Explanation"
                                )}
                            </Button>
                        )}
                    </div>
                    <div className="text-sm">
                        <p className="">
                            {ParsedElement(currentExplanation) || "No explanation available for this question."}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}