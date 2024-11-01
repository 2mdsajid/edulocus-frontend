import { LucideIcon } from "lucide-react";

export type ANSWER = 'a' | 'b' | 'c' | 'd'
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

export type TQuestion = TBaseQuestion & {
    options: TBaseOption,

    // to add additional data by users
    uans?: string
    timetaken?: number
}

export type TcreateCustomTest = Pick<CustomTest,
    'name' |
    'slug' |
    'createdById' |
    'questions'
>

// for leaderboards
export type TBaseUserScore = Pick<UserScore, 'username' | 'totalScore'>

// typs of tests
export type TTypeOfTest = "MODEL"
    | "SUBJECT_WISE"
    | "CHAPTER_WISE"
    | "TOPIC_WISE"
    | "CUSTOM"
    | "UNIT_WISE"
    | "DIFFICULTY_BASED"
    | "RANDOM"
    | "FLASH"
    | "AI_GENERATED"
    | "PERFORMANCE_ANALYZER"
    | "PBQ_BASED"
    | "THEORY_BASED"
    | "REVISION"
    | "RETAKE"


export type TTypeOfTestsAndDescription = {
    type: TTypeOfTest;
    description: string;
    isAvailable: boolean;
    icon: LucideIcon;
}



