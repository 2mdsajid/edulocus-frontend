type ShadcnToast = {
  state: "success" | "destructive";
  message: string;
};

type TypeResponseQuestions = {
  [key: string]: TypeQuestion[]
};


type STREAM = "PG" | "UG"

// typs of tests
type TTypeOfTest = "MODEL"
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
    | "PAST_PAPER"