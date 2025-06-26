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
    videoUrl?: string
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
    stream: TStream;
    questions: string[];
    description?: string
    specialUrl?: string
    imageUrl?: string
    specialImage?: string

}

export type TPastPaper = {
    category: string | null;
    stream: TStream;
    isUnlocked: boolean;
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

export type TReportQuestion = TQuestion & {message : string | null}


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
    'archive' |
    'questions' |
    'stream'
> & {
    creator?: string,
    pastPaper: TBasePastPaper | null
}


// for leaderboards
export type TBaseUserScore = Pick<UserScore, 'username' | 'totalScore'>


export type TTypeOfTestsAndDescription = {
    type: TTypeOfTest;
    description: string;
    isAvailableTo: TStream[]; // for which stream is the test available to
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
    gid: string | null
    description?: string;
    imageUrl?: string;
    specialUrl?: string;
    specialImage?: string;
    isLocked: boolean;
};




export type TSingleCustomTestWithQuestions = Pick<CustomTest,
    'id' |
    'name' |
    'slug' |
    'stream' |
    'archive'
> & {
    createdBy: string,
    questions: TQuestion[]
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



export type TTestLock = {
    isLocked: boolean,
    keysUsed: string[],
    lockCodes: string[]
}


export type TCustomTestMetadata = Pick<CustomTest,
    'name' |
    'slug' |
    'date' |
    'archive' |
    'id' |
    'image' |
    'usersConnected' |
    'description' |
    'specialImage' |
    'specialUrl' |
    'imageUrl'
> & {
    createdBy: string,
    questionsCount: number
    usersAttended: TBaseUserScore[]
    testLock: TTestLock | null
}