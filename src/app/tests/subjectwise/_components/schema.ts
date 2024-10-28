// Schema definitions

import { QuestionCount } from "@/app/tests/_components/schema"
export type TTotalQuestionsPerSubject = Pick<QuestionCount, 'subject' | 'count'>
