"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from 'react'

// You'll need to create this API function
import { getQuestionsBySubject } from '@/lib/actions/questions.actions'
import { TQuestion, TSingleCustomTestWithQuestions } from '@/lib/schema/tests.schema'
import SaveChangesDialog from './SaveChangesDialog'
type Props = {
    test: TSingleCustomTestWithQuestions
    subjects: string[]
}



const TestManagementPage = (props: Props) => {
    const { subjects } = props;


    const [test, setTest] = useState<TSingleCustomTestWithQuestions>(props.test);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(props.subjects[0]);
    const [availableQuestions, setAvailableQuestions] = useState<TQuestion[]>([]);
    const [selectedNewQuestions, setSelectedNewQuestions] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);


    const handleRemoveQuestion = (questionId: string) => {
        if (!test) return;

        const updatedQuestions = test.questions.filter(q => q.id !== questionId);
        setTest({
            ...test,
            questions: updatedQuestions,
        });
    };

    const handleOpenImportSheet = async () => {
        if (!selectedSubject) return;

        setIsLoading(true);
        try {
            const { data: questions, message } = await getQuestionsBySubject(selectedSubject);

            // Filter out questions that are already in the test
            const currentQuestionIds = new Set(test?.questions.map(q => q.id) || []);
            const newQuestions = questions?.filter(q => !currentQuestionIds.has(q.id)) || [];
            setAvailableQuestions(newQuestions);
        } catch (err) {
            console.error("Failed to fetch available questions", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleNewQuestion = (questionId: string) => {
        const newSelectedQuestions = new Set(selectedNewQuestions);
        if (newSelectedQuestions.has(questionId)) {
            newSelectedQuestions.delete(questionId);
        } else {
            newSelectedQuestions.add(questionId);
        }
        setSelectedNewQuestions(newSelectedQuestions);
    };

    const handleAddSelectedQuestions = () => {
        if (!test) return;

        const questionsToAdd = availableQuestions.filter(q => selectedNewQuestions.has(q.id));
        const updatedQuestions = [...test.questions, ...questionsToAdd];

        setTest({
            ...test,
            questions: updatedQuestions,
        });

        setSelectedNewQuestions(new Set());
    };


    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold">{test?.name.toUpperCase()}</h1>
                {/* <p className="text-gray-600">Test ID: {test?.id}</p> */}

                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                        {subjects.map(subject => (
                            <Button
                                className='text-xs'
                                key={subject}
                                variant={selectedSubject === subject ? "default" : "outline"}
                                onClick={() => setSelectedSubject(subject)}
                            >
                                {subject}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-2">

                        {/* to import new questiosn */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button onClick={handleOpenImportSheet}>Import Questions</Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto pt-24">
                                <SheetHeader>
                                    <SheetTitle>Import Questions</SheetTitle>
                                    <SheetDescription>
                                        Select and scroll down to add
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="py-4 space-y-4">
                                    {availableQuestions.length === 0 ? (
                                        <p>No additional questions available for this subject.</p>
                                    ) : (
                                        availableQuestions.map(question => (
                                            <div key={question.id} className="border p-4 rounded-md">
                                                <div className="flex items-start gap-2">
                                                    <Checkbox
                                                        id={question.id}
                                                        checked={selectedNewQuestions.has(question.id)}
                                                        onCheckedChange={() => handleToggleNewQuestion(question.id)}
                                                    />
                                                    <div className="space-y-2 w-full">
                                                        <label htmlFor={question.id} className="font-medium cursor-pointer">
                                                            {question.question}
                                                        </label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="p-2 border rounded-md">A: {question.options.a}</div>
                                                            <div className="p-2 border rounded-md">B: {question.options.b}</div>
                                                            <div className="p-2 border rounded-md">C: {question.options.c}</div>
                                                            <div className="p-2 border rounded-md">D: {question.options.d}</div>
                                                        </div>
                                                        <div className="text-sm text-green-600">
                                                            Answer: {question.answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Button
                                        onClick={handleAddSelectedQuestions}
                                        disabled={selectedNewQuestions.size === 0}
                                    >
                                        Add Selected Questions ({selectedNewQuestions.size})
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* to save changes */}
                        <SaveChangesDialog
                            testId={test.id}
                            questionIds={test?.questions.map(question => question.id)}
                        />

                    </div>

                </div>
            </div>


            {/* this portion wil render questions */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                    {selectedSubject} - questions ({test?.questions.filter(question => question.subject === selectedSubject).length})
                </h2>

                {test?.questions.length === 0 ? (
                    <p>No questions available for this subject.</p>
                ) : (
                    test?.questions
                        .filter(question => question.subject === selectedSubject)
                        .map((question, index) => (
                            <div key={question.id} className="border rounded-lg p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-medium">Q{index + 1}: {question.question}</h3>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveQuestion(question.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3 border rounded-md">
                                        <span className="font-semibold">A:</span> {question.options.a}
                                    </div>
                                    <div className="p-3 border rounded-md">
                                        <span className="font-semibold">B:</span> {question.options.b}
                                    </div>
                                    <div className="p-3 border rounded-md">
                                        <span className="font-semibold">C:</span> {question.options.c}
                                    </div>
                                    <div className="p-3 border rounded-md">
                                        <span className="font-semibold">D:</span> {question.options.d}
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-md">
                                    <p className="font-semibold text-green-700">
                                        Correct Answer: {question.answer}
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-md">
                                    <p className="font-semibold text-blue-700 mb-1">Explanation:</p>
                                    <p>{question.explanation}</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                                    <div>Chapter: {question.chapter}</div>
                                    <div>Unit: {question.unit}</div>
                                    <div>Difficulty: {question.difficulty}</div>
                                    <div>Stream: {question.stream}</div>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default TestManagementPage;