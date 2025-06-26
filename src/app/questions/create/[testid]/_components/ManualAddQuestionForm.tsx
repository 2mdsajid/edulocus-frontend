// components/ManualAddQuestionForm.tsx
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { getAllTopicsBySubject } from '@/lib/methods/questions.methods';
import { TBaseImages } from "@/lib/schema/questions.schema"; // Ensure TBaseImages is imported
import { TQuestion } from '@/lib/schema/tests.schema'; // Ensure TQuestion is imported
import { TStream } from '@/lib/schema/users.schema';
import { useEffect, useState } from 'react';

// Import dialog components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Image as ImageIcon, XCircle } from 'lucide-react'; // Import an icon for the button and for removing images
import UploadImage from "./UploadImage";

// Import the updated ImageUploaderComponent

// Define a type for the data we send to the API, without the ID
// Explicitly include images and videoUrl as they might be new additions
type NewQuestionData = Omit<TQuestion, 'id'> & {
    images: TBaseImages | null;
    videoUrl: string | null; // Ensure this is nullable in the type
};

type Props = {
    stream: TStream
    subjects: string[];
    syllabus: any; // Add syllabus prop to get chapters
    onQuestionAdd: (newQuestionData: NewQuestionData) => Promise<void>; // Prop now expects a Promise
    isLoading: boolean; // Add isLoading prop to disable button
};

const ManualAddQuestionForm = ({ stream, subjects, syllabus, onQuestionAdd, isLoading }: Props) => {
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
    const [videoUrl, setVideoUrl] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [chapters, setChapters] = useState<string[]>([]);

    // State for images, initialized with all nulls
    const [images, setImages] = useState<TBaseImages>({
        a: null,
        b: null,
        c: null,
        d: null,
        qn: null,
        exp: null,
    });
    // State to manage which dialog is open and for which field
    const [currentUploadField, setCurrentUploadField] = useState<keyof TBaseImages | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    // Update chapters when subject changes
    useEffect(() => {
        if (subject && syllabus) {
            const subjectChapters = getAllTopicsBySubject(syllabus, subject);
            setChapters(subjectChapters || []);
            setChapter(''); // Reset chapter when subject changes
        }
    }, [subject, syllabus]);

    // Handler for when an image is successfully uploaded from ImageUploaderComponent
    const handleImageUploaded = (field: keyof TBaseImages, url: string) => {
        setImages(prev => ({
            ...prev,
            [field]: url
        }));
        setIsDialogOpen(false); // Close the dialog after upload
    };

    // Handler to remove an uploaded image
    const handleRemoveImage = (field: keyof TBaseImages) => {
        setImages(prev => ({
            ...prev,
            [field]: null
        }));
        toast({
            title: "Image Removed",
            description: `Image for ${field.toUpperCase()} has been removed.`,
            variant: "default",
        });
    };

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
            unit: "",
            stream: stream,
            videoUrl: videoUrl, // Ensure videoUrl is nullable and sent correctly
            images: images, // Pass the images object
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
            setVideoUrl('');
            setImages({ a: null, b: null, c: null, d: null, qn: null, exp: null }); // Reset images
            toast({
                title: "Success",
                description: "Question added successfully!",
                variant: "success",
            });

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

    // Helper function to render input with image upload dialog
    const renderInputFieldWithImage = (
        id: string,
        label: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        imageField: keyof TBaseImages,
        inputType: "input" | "textarea" = "textarea",
        required: boolean = true
    ) => (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex items-center gap-2">
                {inputType === "textarea" ? (
                    <Textarea
                        id={id}
                        value={value}
                        onChange={onChange}
                        placeholder={`Enter the ${label.toLowerCase()}`}
                        required={required}
                        className="flex-grow"
                    />
                ) : (
                    <Input
                        id={id}
                        value={value}
                        onChange={onChange}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        required={required}
                        className="flex-grow"
                    />
                )}

                <Dialog open={isDialogOpen && currentUploadField === imageField} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => { setCurrentUploadField(imageField); setIsDialogOpen(true); }}
                            title={`Upload image for ${label}`}
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Image for {label}</DialogTitle>
                            <DialogDescription>
                                Upload an image that will be associated with the {label.toLowerCase()}.
                            </DialogDescription>
                        </DialogHeader>
                        <UploadImage
                            field={imageField}
                            onImageUploaded={handleImageUploaded}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            {/* Display uploaded image URL and remove button if present */}
            {images[imageField] && (
                <div className="flex items-center justify-between w-fit p-2 border rounded-md bg-gray-50 text-sm break-all">
                    <img src={images[imageField]} alt="Uploaded" className="h-20  w-fit" />
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveImage(imageField)} title="Remove image">
                        <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            )}
        </div>
    );


    return (
        <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Manually Add New Question</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {renderInputFieldWithImage(
                    "question", "Question", question, (e) => setQuestion(e.target.value), "qn", "textarea"
                )}

                <div className="grid grid-cols-2 gap-4">
                    {renderInputFieldWithImage(
                        "optionA", "Option A", optionA, (e) => setOptionA(e.target.value), "a", "input"
                    )}
                    {renderInputFieldWithImage(
                        "optionB", "Option B", optionB, (e) => setOptionB(e.target.value), "b", "input"
                    )}
                    {renderInputFieldWithImage(
                        "optionC", "Option C", optionC, (e) => setOptionC(e.target.value), "c", "input"
                    )}
                    {renderInputFieldWithImage(
                        "optionD", "Option D", optionD, (e) => setOptionD(e.target.value), "d", "input"
                    )}
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

                {renderInputFieldWithImage(
                    "explanation", "Explanation", explanation, (e) => setExplanation(e.target.value), "exp", "textarea"
                )}

                <div>
                    <Label htmlFor="videoUrl">Video URL (optional)</Label>
                    <Input
                        id="videoUrl"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Enter video URL for explanation"
                        type="url"
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