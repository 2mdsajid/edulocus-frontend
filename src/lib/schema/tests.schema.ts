import { LucideIcon } from "lucide-react";
import { TStream } from "./users.schema";
import { TBaseImages } from "./questions.schema";
export type ANSWER = 'a' | 'b' | 'c' | 'd'
export type Images = {
    a: string | null;
    b: string | null;
    c: string | null;
    d: string | null;
    questionId: string;
    qn: string | null;
    exp: string | null;
}

export type Option = {
    questionId: string;
    a: string;
    b: string;
    c: string;
    d: string;
}
export type Question = {
    id: string;
    question: string;
    answer: ANSWER;
    explanation: string;
    subject: string;
    chapter: string;
    unit: string;
    stream: TStream;
    category: string;
    difficulty: string;
    attempt: number;
    correctattempt: number;
    userId: string;
}

export type QuestionCount = {
    id: string;
    subject: string;
    chapter: string;
    count: number;
}

export type CustomTest = {
    name: string;
    id: string;
    slug: string;
    image: string | null;
    createdById: string;
    archive: boolean;
    usersConnected: string[];
    keysUsed: string[];
    date: Date;
    questions: string[];
}

export type TPastPaper = {
    category: string | null;
    stream: STREAM;
    year: number;
    affiliation: string | null;
    customTestId: string;
}

export type TestQuestionAnswer = {
    id: string;
    questionId: string;
    userAnswer: string;
    testAnalyticId: string;
}

export type TestAnalytic = {
    id: string;
    userId: string;
    customTestId: string;
}

export type UserScore = {
    id: string;
    customTestId: string;
    username: string;
    totalScore: number;
}

export type TBaseQuestion = Omit<Question,
    'category' |
    'attempt' |
    'correctattempt' |
    'userId'
>

export type TBaseOption = Omit<Option, 'questionId'>

export type TUserAns = {
    [key: string]: {
        uans: string
        timetaken: number
    }
}

export type TQuestion = TBaseQuestion & {
    options: TBaseOption,
    images?: TBaseImages,
    uans?: string
    timetaken?: number
}

export type TcreateCustomTest = Pick<CustomTest,
    'name' |
    'slug' |
    'createdById' |
    'questions'
>

// for model, past tests and other custom tests
export type TBasePastPaper = Omit<TPastPaper, 'customTestId'>
export type TBaseCustomTest = Pick<CustomTest,
    'id' |
    'name' |
    'date' |
    'questions'
> & {
    pastPaper: TBasePastPaper | null
}


// for leaderboards
export type TBaseUserScore = Pick<UserScore, 'username' | 'totalScore'>


export type TTypeOfTestsAndDescription = {
    type: TTypeOfTest;
    description: string;
    isAvailable: boolean;
    icon: LucideIcon;
}


export type TTotalQuestionsPerSubjectAndChapter =
    {
        [subject: string]: {
            [chapter: string]: number
        }
    }



export type TCreateCustomTestData = {
    name: string;
    slug: string;
    limit: number;
    stream: TStream;
};




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




export type TCustomTestMetadata = Pick<CustomTest,
    'name' |
    'slug' |
    'date' |
    'archive' |
    'id' |
    'usersConnected' 
> & {
    createdBy: string,
    questionsCount: number
    usersAttended: TBaseUserScore[]
    image?: string
}
