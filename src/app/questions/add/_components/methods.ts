

export const isExpectedFileFormat = (question: any): boolean => {
    if (
        !question ||
        typeof question.qn !== "string" ||
        question.qn.trim() === ""
    ) {
        return false;
    }
    if (!question.options || typeof question.options !== "object") {
        return false;
    }
    if (
        !question.options.hasOwnProperty("a") ||
        !question.options.hasOwnProperty("b") ||
        !question.options.hasOwnProperty("c") ||
        !question.options.hasOwnProperty("d") ||
        typeof question.options.a !== "string" ||
        typeof question.options.b !== "string" ||
        typeof question.options.c !== "string" ||
        typeof question.options.d !== "string"
    ) {
        return false;
    }
    if (
        !question.ans ||
        typeof question.ans !== "string" ||
        !["a", "b", "c", "d"].includes(question.ans)
    ) {
        return false;
    }

    return true;
};