import { ANSWER, Option, TQuestion } from "@/app/tests/_components/schema";


export type TBaseOption = Omit<Option, 'questionId'>
export type TAnswer = ANSWER
export type TAddQuestion = Omit<TQuestion, 'id'>

export type TExpectedQuestionFormatFromFile = {
    qn: string,
    options: TBaseOption,
    ans: string
    chapter?: string
    subject?: string
    difficulty?: string
    exp?: string
}