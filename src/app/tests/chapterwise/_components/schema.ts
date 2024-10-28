// Schema definitions
export type TTotalQuestionsPerSubjectAndChapter =
    {
        [subject: string]: {
            [chapter: string]: number
        }
    }