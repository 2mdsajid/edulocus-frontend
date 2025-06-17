// components/ManualAddQuestionForm.tsx
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { getAllTopicsBySubject } from '@/lib/methods/questions.methods';
import { TQuestion } from '@/lib/schema/tests.schema';
import { TStream } from '@/lib/schema/users.schema';
import { useEffect, useState } from 'react';

// Define a type for the data we send to the API, without the ID
type NewQuestionData = Omit<TQuestion, 'id'>;

type Props = {
    stream:TStream
    subjects: string[];
    syllabus: any; // Add syllabus prop to get chapters
    onQuestionAdd: (newQuestionData: NewQuestionData) => Promise<void>; // Prop now expects a Promise
    isLoading: boolean; // Add isLoading prop to disable button
};

const ManualAddQuestionForm = ({ stream,subjects, syllabus, onQuestionAdd, isLoading }: Props) => {
    const [question, setQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [answer, setAnswer] = useState<'a' | 'b' | 'c' | 'd'>('a');
    const [explanation, setExplanation] = useState('');
    const [subject, setSubject] = useState(subjects[0] || '');
    const [chapter, setChapter] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [formError, setFormError] = useState<string | null>(null); // Renamed to avoid conflict
    const [chapters, setChapters] = useState<string[]>([]);

    // Update chapters when subject changes
    useEffect(() => {
        if (subject && syllabus) {
            const subjectChapters = getAllTopicsBySubject(syllabus, subject);
            setChapters(subjectChapters || []);
            setChapter(''); // Reset chapter when subject changes
        }
    }, [subject, syllabus]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const missingFields = [];
        if (!question) missingFields.push('Question');
        if (!optionA) missingFields.push('Option A');
        if (!optionB) missingFields.push('Option B');
        if (!optionC) missingFields.push('Option C');
        if (!optionD) missingFields.push('Option D');
        if (!explanation) missingFields.push('Explanation');
        if (!subject) missingFields.push('Subject');
        if (!chapter) missingFields.push('Chapter');
        if (!difficulty) missingFields.push('Difficulty');

        if (missingFields.length > 0) {
            toast({
                title: "Warning",
                description: `Please fill in the following fields: ${missingFields.join(', ')}`,
                variant: "destructive",
            });
            return;
        }

        const newQuestionData: NewQuestionData = {
            question,
            options: { a: optionA, b: optionB, c: optionC, d: optionD },
            answer,
            explanation,
            subject,
            chapter,
            difficulty: difficulty.toLowerCase().charAt(0),
            unit : "",
            stream: stream // Assuming a default stream
        };

        try {
            await onQuestionAdd(newQuestionData);
            // Clear form fields only on successful addition
            setQuestion('');
            setOptionA('');
            setOptionB('');
            setOptionC('');
            setOptionD('');
            setAnswer('a');
            setExplanation('');
            setChapter('');
            setDifficulty('');
            
        } catch (error) {
            console.error("Failed to add question:", error);
            setFormError("Failed to add question. Please try again.");
            toast({
                title: "Error",
                description: "Failed to add question. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Manually Add New Question</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the question"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="optionA">Option A</Label>
                        <Input id="optionA" value={optionA} onChange={(e) => setOptionA(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="optionB">Option B</Label>
                        <Input id="optionB" value={optionB} onChange={(e) => setOptionB(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="optionC">Option C</Label>
                        <Input id="optionC" value={optionC} onChange={(e) => setOptionC(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="optionD">Option D</Label>
                        <Input id="optionD" value={optionD} onChange={(e) => setOptionD(e.target.value)} required />
                    </div>
                </div>
                <div>
                    <Label htmlFor="answer">Correct Answer</Label>
                    <Select value={answer} onValueChange={(value: 'a' | 'b' | 'c' | 'd') => setAnswer(value)} required>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Answer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">A</SelectItem>
                            <SelectItem value="b">B</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="d">D</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="explanation">Explanation</Label>
                    <Textarea
                        id="explanation"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Enter the explanation for the answer"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="chapter">Chapter</Label>
                    <Select value={chapter} onValueChange={setChapter} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Chapter" />
                        </SelectTrigger>
                        <SelectContent>
                            {chapters.map((chap) => (
                                <SelectItem key={chap} value={chap}>{chap}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div> 
                <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Question to Test"}
                </Button>
            </form>
        </div>
    );
};

export default ManualAddQuestionForm;