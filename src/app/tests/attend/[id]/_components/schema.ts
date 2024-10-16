import { CustomTest, TestAnalytic, TestQuestionAnswer, TQuestion, UserScore } from "@/app/tests/_components/schema";

export type TSingleCustomTestWithQuestions = Pick<CustomTest,
    'id' |
    'name' |
    'slug' |
    'questions'
> & {
    createdBy: string,
    fetchedQuestions: TQuestion[]
}

export type TCreateTestQuestionAnswer = Pick<TestQuestionAnswer,
    'questionId' |
    'userAnswer'
>

export type TBaseTestAnalytic = TestAnalytic

export type TCreateTestAnalytic = Pick<TestAnalytic,
    'userId' |
    'customTestId'
> & { questionsWithAnswers: TCreateTestQuestionAnswer[] }

// for leaderboard
export type TSaveUserScore = Omit<UserScore, 'id'>














export type TypeTypeSubjectWiseChapterScores = {
    [key: string]: {
        [key: string]: {
            total: number;
            correct: number;
            incorrect: number;
            unattempt: number
        };
    };
}

export type QuestionsIdsAndScores = {
    qn: string,
    uans?: string
    t: number
}[]

export type TypeSubjectWiseScores = {
    [key: string]: {
        total: number;
        correct: number;
        incorrect: number;
    }
}

export type TypeSubjectWiseBarGraphData = {
    name: string;
    Total: number;
    Correct: number;
    Incorrect: number;
    Unattempt: number;
}[]