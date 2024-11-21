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

// TO STORE USER ANSWER AND THE QUESTION IDS
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

export type TSubjectWiseChapterScores = {
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

export type TChapterAccuracy = {
    chapter: string,
    accuracy: number
}

export type TScoreBreakdown = {
    total: number;
    correct: number;
    incorrect: number;
    unattempt: number;
}

export type TIndividualSubjectScores = {
    name: string;
    chapterAccuracies: TChapterAccuracy[];
} & TScoreBreakdown