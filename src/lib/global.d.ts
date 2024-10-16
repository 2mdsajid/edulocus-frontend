type ShadcnToast = {
  state: "success" | "destructive";
  message: string;
};

export type TypeResponseQuestions = {
  [key: string]: TypeQuestion[]
};