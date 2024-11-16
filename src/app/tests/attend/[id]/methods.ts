import { TIndividualSubjectScores, TSubjectWiseChapterScores } from "./schema";

export const chunkArray = (arr: TIndividualSubjectScores[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};


export function subjectWiseChapterScore(data: TSubjectWiseChapterScores): TIndividualSubjectScores[] {
    const result: TIndividualSubjectScores[] = [];

    for (const subject in data) {
        let total = 0;
        let correct = 0;
        let incorrect = 0;
        let unattempt = 0;
        const chapterAccuracies: { chapter: string; accuracy: number }[] = [];

        for (const chapter in data[subject]) {
            const chapterData = data[subject][chapter];
            total += chapterData.total;
            correct += chapterData.correct;
            incorrect += chapterData.incorrect;
            unattempt += chapterData.unattempt;

            // Calculate accuracy for each chapter
            const accuracy = chapterData.total > 0 ? (chapterData.correct / chapterData.total) * 100 : 0;
            chapterAccuracies.push({
                chapter: chapter,
                accuracy: accuracy
            });
        }

        result.push({
            name: subject,
            total,
            correct,
            incorrect,
            unattempt,
            chapterAccuracies
        });
    }

    return result;
}
