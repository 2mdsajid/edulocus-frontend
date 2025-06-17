// app/your-path/TestManagementPage.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'

import { toast } from "@/hooks/use-toast"
import { addSingleQuestion, getQuestionsBySubject } from '@/lib/actions/questions.actions'; // Import addSingleQuestion
import { getAllSubjects } from "@/lib/methods/questions.methods"
import { TQuestion, TSingleCustomTestWithQuestions } from '@/lib/schema/tests.schema'
import GenerateTestPDF from "./GenerateTestPDF"
import ManualAddQuestionForm from "./ManualAddQuestionForm"
import SaveChangesDialog from './SaveChangesDialog'

type Props = {
    test: TSingleCustomTestWithQuestions
    syllabus: TSyllabus
}

const TestManagementPage = (props: Props) => {
    const subjects = getAllSubjects(props.syllabus)

    const [test, setTest] = useState<TSingleCustomTestWithQuestions>(props.test);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(subjects[0]);
    const [availableQuestions, setAvailableQuestions] = useState<TQuestion[]>([]);
    const [selectedNewQuestions, setSelectedNewQuestions] = useState<Set<string>>(new Set());
    const [isLoadingImport, setIsLoadingImport] = useState(true); // Renamed for clarity
    const [isLoadingAddManual, setIsLoadingAddManual] = useState(false); // New loading state for manual add
    const [activeTab, setActiveTab] = useState("view_questions");

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

        setIsLoadingImport(true);
        try {
            const { data: questions, message } = await getQuestionsBySubject(selectedSubject);

            const currentQuestionIds = new Set(test?.questions.map(q => q.id) || []);
            const newQuestions = questions?.filter(q => !currentQuestionIds.has(q.id)) || [];
            setAvailableQuestions(newQuestions);
        } catch (err) {
            console.error("Failed to fetch available questions", err);
            setError("Failed to load questions for import.");
        } finally {
            setIsLoadingImport(false);
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

    const handleManuallyAddQuestion = async (newQuestionData: Omit<TQuestion, 'id'>) => {
        setIsLoadingAddManual(true);
        setError(null);
        try {
            const { data: questionId, message } = await addSingleQuestion(newQuestionData);

            if (!questionId) {
                toast({
                    title: "Warning",
                    description: message || "Question ID not returned from API.",
                    variant: "destructive"
                });
                return;
            }

            // Create the complete question object with the ID from backend
            const addedQuestion: TQuestion = {
                id: questionId,
                ...newQuestionData
            };

            // Add the new question to the test's questions
            setTest((prevTest) => {
                if (!prevTest) return prevTest;
                return {
                    ...prevTest,
                    questions: [...prevTest.questions, addedQuestion],
                };
            });

            toast({
                title: "Success",
                description: "Question added successfully!",
                variant: "success"
            });

            setActiveTab("view_questions"); // Switch back to view questions after adding
        } catch (err: any) {
            console.error("Error adding question manually:", err);
            toast({
                title: "Error",
                description: err.message || "Failed to add question manually.",
                variant: "destructive"
            });
        } finally {
            setIsLoadingAddManual(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold">{test?.name.toUpperCase()}</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-1">
                        {subjects.map(subject => (
                            <Button
                                className='text-xs px-2 py-1 h-6'
                                key={subject}
                                variant={selectedSubject === subject ? "default" : "outline"}
                                onClick={() => setSelectedSubject(subject)}
                            >
                                {subject}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {/* to import new questions */}
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
                                    {isLoadingImport ? (
                                        <p>Loading available questions...</p>
                                    ) : availableQuestions.length === 0 ? (
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

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Tabs for View Questions and Manually Add Question */}
            <div className="my-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-fit grid-cols-2">
                        <TabsTrigger value="view_questions">View Current Questions</TabsTrigger>
                        <TabsTrigger value="add_question">Manually Add Question</TabsTrigger>
                    </TabsList>
                    <TabsContent value="view_questions">
                        {/* this portion will render questions */}
                        <div className="space-y-6 mt-6">
                            <h2 className="text-xl font-semibold">
                                {selectedSubject} - questions ({test?.questions.filter(question => question.subject === selectedSubject).length})
                            </h2>
                            <GenerateTestPDF
                                questions={test.questions}
                                testName={test.name}
                            />

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
                    </TabsContent>
                    <TabsContent value="add_question">
                        <ManualAddQuestionForm
                            syllabus={props.syllabus}
                            stream={props.test.stream}
                            subjects={subjects}
                            onQuestionAdd={handleManuallyAddQuestion}
                            isLoading={isLoadingAddManual}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default TestManagementPage;