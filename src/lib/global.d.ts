type ShadcnToast = {
  state: "success" | "destructive";
  message: string;
};

type TypeResponseQuestions = {
  [key: string]: TypeQuestion[]
};


type STREAM = "PG" | "UG"


type TSyllabus = {
  [key: string]: { //this is the chapter name
    marks: number, //this is the marks of the chapter
    topics: string[] //this is the topics in the chapter
  }
}

type TSyllabusCombined = {
  [key: string]: TSyllabus //this is the subject name
}


// typs of tests
type TTypeOfTest = "MODEL"
    | "SUBJECT_WISE"
    | "CHAPTER_WISE"
    | "TOPIC_WISE"
    | "CUSTOM"  
    | "UNIT_WISE"
    | "DAILY_TEST"
    | "DIFFICULTY_BASED"
    | "RANDOM"
    | "FLASH"
    | "AI_GENERATED"
    | "PERFORMANCE_ANALYZER"
    | "PBQ_BASED"
    | "THEORY_BASED"
    | "REVISION"
    | "RETAKE"
    | "PAST_PAPER"
    | "LIVE"
    | "MOCK" //newly added for exclusive 200 marks tests