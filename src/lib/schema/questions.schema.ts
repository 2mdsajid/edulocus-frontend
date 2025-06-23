import { ANSWER, Images, Option, QuestionCount, TQuestion } from "./tests.schema";
import { TStream } from "./users.schema";

export type TPGSyllabus = {
    [key: string]: {
      marks: number,
      topics: string[]
    }
  }


export type PastPaper = {
  category: string | null;
  stream: string //change later to fixed values;
  year: number;
  affiliation: string | null;
  customTestId: string;
}


export type TBaseOption = Omit<Option, 'questionId'>
export type TKeyOption = keyof TBaseOption
export type TAnswer = ANSWER
export type TAddQuestion = Omit<TQuestion, 'id'>
export type TBaseImages = Omit<Images, 'questionId'>

export type TExpectedQuestionFormatFromFile = {
  qn: string,
  options: TBaseOption,
  ans: string
  chapter?: string
  subject?: string
  unit?: string
  difficulty?: string
  exp?: string
  images?: TBaseImages
}

// export type TField = keyof TExpectedQuestionFormatFromFile
export type TBasePastPaper = Omit<PastPaper, 'customTestId'>
export type TCreatePastTestData = TBasePastPaper & { questions: TAddQuestion[] }


export type TAffiliation = string;
export type Category = {
  name: string;
  affiliations: TAffiliation[];
};
export type TStreamHierarchy = {
  name: TStream;
  categories: Category[];
  affiliations?: TAffiliation[];
};


export type TAiQUestionUpdate = {
  id: string, // Assuming the ID is needed for update
  question: string,
  options: TBaseOption,
  answer: string,
  explanation: string,
  message: string | null, // Include the report message
}

export type TTotalQuestionsPerSubject = Pick<QuestionCount, 'subject' | 'count'>
