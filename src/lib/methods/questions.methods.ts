import { TPGSyllabus, TStreamHierarchy } from "@/lib/schema/questions.schema";
import { TStream } from "../schema/users.schema";

// 1. Get a list of all subjects
export function getAllSubjects(syllabus: TPGSyllabus): string[] {
    return Object.keys(syllabus);
}

// 2. Get a list of topics for a specific subject
export function getTopicsBySubject(syllabus: TPGSyllabus, subject: string): string[] | null {
    if (syllabus[subject]) {
        return syllabus[subject].topics;
    }
    return null;
}

// 3. Get marks of all subjects
export function getMarksOfAllSubjects(syllabus: TPGSyllabus): { [subject: string]: number } {
    const marks: { [subject: string]: number } = {};
    for (const subject in syllabus) {
        marks[subject] = syllabus[subject].marks;
    }
    return marks;
}

export const isTopicInSyllabus = (
    syllabus: TPGSyllabus,
    subject: string,
    topic: string
): boolean => {
    if (!syllabus[subject]) {
        return false;
    }
    return syllabus[subject].topics.includes(topic);
}


// Get all stream names
export function getAllStreams(STREAM_HIERARCHY: TStreamHierarchy[]): TStream[] {
    return STREAM_HIERARCHY.map(stream => stream.name);
}

// Get categories of the given stream
export function getCategoriesOfStream(STREAM_HIERARCHY: TStreamHierarchy[], streamName: TStream): string[] | null {
    const stream = STREAM_HIERARCHY.find(s => s.name === streamName);
    return stream ? stream.categories.map(category => category.name) : null;
}

// Get affiliations of the given stream and category
export function getAffiliationsOfStreamCategory(
    STREAM_HIERARCHY: TStreamHierarchy[],
    streamName: string,
    categoryName: string
): string[] | null {
    const stream = STREAM_HIERARCHY.find(s => s.name === streamName);
    if (!stream) return null;

    const category = stream.categories.find(c => c.name === categoryName);
    return category ? category.affiliations : null;
}




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