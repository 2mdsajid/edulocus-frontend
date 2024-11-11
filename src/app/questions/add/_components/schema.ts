import { ANSWER, Option, TQuestion } from "@/app/tests/_components/schema";

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

export type TExpectedQuestionFormatFromFile = {
  qn: string,
  options: TBaseOption,
  ans: string
  chapter?: string
  subject?: string
  difficulty?: string
  exp?: string
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
  name: string;
  categories: Category[];
  affiliations?: TAffiliation[];
};