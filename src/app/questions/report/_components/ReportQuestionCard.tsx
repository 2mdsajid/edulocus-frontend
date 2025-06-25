'use client'

import { TAiQUestionUpdate } from '@/lib/schema/questions.schema'
import { ANSWER, TReportQuestion } from '@/lib/schema/tests.schema'
import React, { useState, useEffect } from 'react' // Import useEffect
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Import Input component
import { toast } from '@/hooks/use-toast';
import { removeReportedQuestion, updateQuestionAction, updateQuestionByAI, } from '@/lib/actions/questions.actions';
import { ParsedElement } from "@/lib/utils";


type Props = {
    questions: TReportQuestion[]
}

const ReportQuestionCard = (props: Props) => {
    const [clientQuestions, setClientQuestions] = useState(props.questions)

    // State for manual editing
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [currentEditedQuestion, setCurrentEditedQuestion] = useState<TAiQUestionUpdate | null>(null);

    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [isLoadingAI, setIsLoadingAI] = useState(false);


    const [isRemoving, setIsRemoving] = useState(false)

    // Ensure `currentEditedQuestion` is reset or updated if `clientQuestions` changes
    // This is important if an AI correction happens while a manual edit dialog is open (though typically, one would close the other)
    useEffect(() => {
        if (editingQuestionId) {
            const questionInState = clientQuestions.find(q => q.id === editingQuestionId);
            if (questionInState) {
                setCurrentEditedQuestion({
                    id: questionInState.id,
                    question: questionInState.question,
                    options: questionInState.options,
                    answer: questionInState.answer,
                    explanation: questionInState.explanation,
                    message: questionInState.message || '', // Ensure message is always a string
                });
            } else {
                setEditingQuestionId(null); // Question no longer exists, exit editing
                setCurrentEditedQuestion(null);
            }
        }
    }, [clientQuestions, editingQuestionId]);


    const handleUpdateQuestion = async (updatedQuestion: TAiQUestionUpdate) => {
        try {
            // Find the question in the state
            const questionIndex = clientQuestions.findIndex(q => q.id === updatedQuestion.id);
            
            if (questionIndex === -1) {
                console.error("Question not found");
                return;
            }

            // Create a new array with the updated question
            const updatedQuestions = [...clientQuestions];
            updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                question: updatedQuestion.question,
                options: updatedQuestion.options,
                answer: updatedQuestion.answer as ANSWER,
                explanation: updatedQuestion.explanation,
                message: updatedQuestion.message // message can be null or undefined, ensure it's handled
            };

            // Update the state
            setClientQuestions(updatedQuestions);
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };


    const handleAICorrectionClick = async (question: TAiQUestionUpdate) => {
        setIsLoadingAI(true);
        // If currently editing manually, exit manual editing mode
        if (editingQuestionId) {
            setEditingQuestionId(null);
            setCurrentEditedQuestion(null);
        }

        const aiCorrectionData = {
            id: question.id,
            question: question.question,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation,
            message: question.message,
        };

        try {
            const { data, message } = await updateQuestionByAI(aiCorrectionData);
            if (!data) {
                toast({
                    title: "Error",
                    description: message,
                    variant: "destructive",
                });
                return;
            }

            // `updateQuestionByAI` should return TAiQUestionUpdate, not TReportQuestion
            // as it's meant for AI updates which include message.
            handleUpdateQuestion(data as TAiQUestionUpdate); 

            toast({
                title: "Success",
                description: "Question successfully updated by AI",
                variant: "success",
            });
        } catch (error) {
            console.error("Failed to apply AI correction:", error);
            toast({
                title: "Error",
                description: "Failed to apply AI correction",
                variant: "destructive",
            });
        } finally {
            setIsLoadingAI(false);
        }
    };

    const handleConfirmSave = async () => {
        if (!currentEditedQuestion) return;

        setIsLoadingSave(true);
        try {
            const {data, message} = await updateQuestionAction(currentEditedQuestion);
            if (data) {
                handleUpdateQuestion(data);
                setEditingQuestionId(null); // Exit editing mode after successful save
                setCurrentEditedQuestion(null);
                toast({
                    variant:"success",
                    title: "Question Saved",
                    description: "Your changes have been saved successfully.",
                });
            } else {
                 toast({
                    title: "Save Failed",
                    description: message || "There was an error saving your changes.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Failed to save question:", error);
            toast({
                title: "Save Failed",
                description: "There was an error saving your changes.",
                variant: "destructive"
            });
        } finally {
            setIsLoadingSave(false);
            setShowSaveDialog(false);
        }
    };

    // --- Manual Editing Handlers ---
    const handleEditClick = (question: TReportQuestion) => {
        // Exit AI loading if it was active
        setIsLoadingAI(false); 
        setEditingQuestionId(question.id);
        setCurrentEditedQuestion({
            id: question.id,
            question: question.question,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation,
            message: question.message || '', // Initialize message to empty string if null
        });
    };

    const handleCancelEdit = () => {
        setEditingQuestionId(null);
        setCurrentEditedQuestion(null);
    };

    const handleSaveClick = () => {
        setShowSaveDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof TAiQUestionUpdate) => {
        if (currentEditedQuestion) {
            setCurrentEditedQuestion({
                ...currentEditedQuestion,
                [field]: e.target.value,
            });
        }
    };

    const handleOptionChange = (key: string, value: string) => {
        if (currentEditedQuestion) {
            setCurrentEditedQuestion({
                ...currentEditedQuestion,
                options: {
                    ...currentEditedQuestion.options,
                    [key]: value,
                },
            });
        }
    };

    const handleAnswerChange = (value: string) => {
        if (currentEditedQuestion) {
            setCurrentEditedQuestion({
                ...currentEditedQuestion,
                answer: value as ANSWER,
            });
        }
    };



    const handleRemove = async (questionId: string) => {
        setIsRemoving(true);
        try {
            const { data, message } = await removeReportedQuestion(questionId);
            if (data) {
                setClientQuestions(prev => prev.filter(q => q.id !== questionId));
                toast({
                    title: 'Success',
                    description: 'Question removed successfully',
                    variant: 'success',
                });
            } else {
                toast({
                    title: 'Error',
                    description: message || 'Failed to remove question',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error("Error removing question:", error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred while removing the question',
                variant: 'destructive',
            });
        } finally {
            setIsRemoving(false);
        }
    };



    return (
        <div className='space-y-5 max-w-3xl mx-auto'>
            {clientQuestions.map((question, i) => {
                const isCurrentlyEditing = editingQuestionId === question.id;
                
                return (
                    <Card className="w-full" key={i}>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            <div className="flex flex-col space-y-2">
                                {/* Display or Input for Question */}
                                {isCurrentlyEditing ? (
                                    <Textarea
                                        value={currentEditedQuestion?.question || ''}
                                        onChange={(e) => handleInputChange(e, 'question')}
                                        className="min-h-[80px]"
                                        aria-label="Edit question"
                                    />
                                ) : (
                                    `Question: ${question.question}`
                                )}
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {question.images?.qn && (
                            <div className="flex justify-center">
                                <img src={question.images.qn} alt="Question Image" className="max-w-full h-auto rounded-md" />
                            </div>
                        )}
        
                        <div>
                            <h3 className="text-md font-semibold mb-2">Options:</h3>
                            <ul className="space-y-3">
                                {Object.entries(isCurrentlyEditing && currentEditedQuestion ? currentEditedQuestion.options : question.options).map(([key, value]) => (
                                    <li key={key} className="flex items-center space-x-2">
                                        {isCurrentlyEditing ? (
                                            <Input
                                                value={value}
                                                onChange={(e) => handleOptionChange(key, e.target.value)}
                                                className="flex-grow"
                                                aria-label={`Edit option ${key.toUpperCase()}`}
                                            />
                                        ) : (
                                            <span>{value}</span>
                                        )}
                                        {question.images?.[key as keyof typeof question.images] && (
                                            <img
                                                src={question.images[key as keyof typeof question.images] as string}
                                                alt={`Option ${key.toUpperCase()}`}
                                                className="inline-block w-16 h-16 ml-2 rounded-md object-cover"
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
        
                        <div>
                            <h3 className="text-md font-semibold mb-2">Answer:</h3>
                            {isCurrentlyEditing && currentEditedQuestion ? (
                                <Select
                                    value={currentEditedQuestion.answer}
                                    onValueChange={handleAnswerChange}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Answer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(currentEditedQuestion.options).map((ans) => (
                                            <SelectItem key={ans} value={ans}>
                                                {ans}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge variant="secondary" className="text-lg">{question.answer.toUpperCase()}</Badge>
                            )}
                        </div>
        
                        <div>
                            <h3 className="text-md font-semibold mb-2">Explanation:</h3>
                            {isCurrentlyEditing ? (
                                <Textarea
                                    value={currentEditedQuestion?.explanation || ''}
                                    onChange={(e) => handleInputChange(e, 'explanation')}
                                    className="min-h-[80px]"
                                    aria-label="Edit explanation"
                                />
                            ) : (
                                <p className="text-gray-700">{ParsedElement(question.explanation)}</p>
                            )}
                            {question.images?.exp && (
                                <div className="mt-2 flex justify-center">
                                    <img src={question.images.exp} alt="Explanation Image" className="max-w-full h-auto rounded-md" />
                                </div>
                            )}
                        </div>
        
                        {/* Display or Input for Report Message */}
                        {question.message && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <h3 className="text-md font-semibold text-red-700">Report Message:</h3>
                                {isCurrentlyEditing ? (
                                    <Textarea
                                        value={currentEditedQuestion?.message || ''}
                                        onChange={(e) => handleInputChange(e, 'message')}
                                        className="min-h-[60px] text-red-600"
                                        aria-label="Edit report message"
                                    />
                                ) : (
                                    <p className="text-red-600">{question.message}</p>
                                )}
                            </div>
                        )}

                        <div className="mt-4 flex justify-end gap-2">
                            {isCurrentlyEditing ? (
                                <>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleCancelEdit}
                                        disabled={isLoadingSave} // Disable if save is in progress
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        onClick={handleSaveClick}
                                        disabled={isLoadingSave} // Disable during save process
                                    >
                                        {isLoadingSave ? 'Saving...' : 'Save Manual Changes'}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button 
                                        onClick={() => handleEditClick(question)}
                                        disabled={isLoadingAI} // Disable if AI correction is in progress globally
                                    >
                                        Manual Correction
                                    </Button>
                                    <Button 
                                        onClick={() => handleAICorrectionClick(question as TAiQUestionUpdate)}
                                        disabled={isLoadingAI || editingQuestionId !== null} // Disable if AI is loading or another question is being edited manually
                                    >
                                        {isLoadingAI ? 'Correcting with AI...' : 'Correct AI'}
                                    </Button>

                                    <Button 
                                        variant="destructive" 
                                        onClick={() => handleRemove(question.id)}
                                        disabled={isRemoving} // Disable during remove process
                                    >
                                        {isRemoving ? 'Removing...' : 'Remove'}
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
                )
            })}

            {/* Alert Dialog for Save Confirmation */}
            <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Save</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to save these manual changes? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoadingSave}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmSave} disabled={isLoadingSave}>
                            {isLoadingSave ? 'Saving...' : 'Save Changes'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ReportQuestionCard;