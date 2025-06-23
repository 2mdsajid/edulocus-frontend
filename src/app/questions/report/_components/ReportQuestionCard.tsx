'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { ANSWER, TReportQuestion, TBaseOption } from "@/lib/schema/tests.schema";
import { updateQuestion, updateQuestionByAI,  } from '@/lib/actions/questions.actions'; // Assuming updateQuestionByAI is also in this file

interface ReportQuestionCardProps {
    question: TReportQuestion;
    showReportInfo: boolean;
}

const ReportQuestionCard = ({ question, showReportInfo }: ReportQuestionCardProps) => {
    // State to manage editing mode
    const [isEditing, setIsEditing] = useState(false);
    // State to manage the save confirmation dialog
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    // State to manage the loading status during manual save operation
    const [isLoadingSave, setIsLoadingSave] = useState(false); // Renamed for clarity
    // State to manage the loading status during AI correction operation
    const [isLoadingAI, setIsLoadingAI] = useState(false); // New AI loading state

    // States to hold editable question data
    const [editedQuestionText, setEditedQuestionText] = useState(question.question);
    const [editedOptions, setEditedOptions] = useState<TBaseOption>(question.options);
    const [editedAnswer, setEditedAnswer] = useState<ANSWER>(question.answer);
    const [editedExplanation, setEditedExplanation] = useState(question.explanation);

    // Reset edited states when the question prop changes (e.g., if a different question is loaded)
    useEffect(() => {
        setEditedQuestionText(question.question);
        setEditedOptions(question.options);
        setEditedAnswer(question.answer);
        setEditedExplanation(question.explanation);
    }, [question]);

    // Handle change for question text
    const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedQuestionText(e.target.value);
    };

    // Handle change for options
    const handleOptionChange = (optionKey: keyof TBaseOption, value: string) => {
        setEditedOptions(prevOptions => ({
            ...prevOptions,
            [optionKey]: value,
        }));
    };

    // Handle change for answer (select dropdown)
    const handleAnswerChange = (value: string) => {
        setEditedAnswer(value as ANSWER);
    };

    // Handle change for explanation
    const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedExplanation(e.target.value);
    };

    // Function to prepare the updated question object for manual save
    const getUpdatedQuestionObject = (): TReportQuestion => {
        return {
            ...question, // Keep original ID and other non-editable fields
            question: editedQuestionText,
            options: editedOptions,
            answer: editedAnswer,
            explanation: editedExplanation,
        };
    };

    // Handle Save button click - opens the dialog
    const handleSaveClick = () => {
        setShowSaveDialog(true);
    };

    // Handle confirmation from the dialog for manual save
    const handleConfirmSave = async () => {
        setIsLoadingSave(true); // Set loading state to true for manual save
        setShowSaveDialog(false); // Close the dialog immediately

        const updatedQuestion = getUpdatedQuestionObject();
        
        try {
            await updateQuestion(updatedQuestion);
            // Optionally, provide user feedback for success (e.g., a toast notification)
        } catch (error) {
            console.error("Failed to update question manually:", error);
            // Optionally, provide user feedback for error (e.g., a toast notification)
        } finally {
            setIsLoadingSave(false); // Always set loading state to false
            setIsEditing(false); // Exit editing mode
        }
    };

    // Handle AI Correction button click
    const handleAICorrectionClick = async () => {
        setIsLoadingAI(true); // Set loading state to true for AI correction

        // Prepare the data to send to the AI correction function
        const aiCorrectionData = {
            id: question.id, // Assuming the ID is needed for update
            question: question.question,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation,
            message: question.message, // Include the report message
        };

        try {
            await updateQuestionByAI(aiCorrectionData);
            // Optionally, provide user feedback for success (e.g., a toast notification)
            // You might want to refresh the question data after AI correction
        } catch (error) {
            console.error("Failed to apply AI correction:", error);
            // Optionally, provide user feedback for error
        } finally {
            setIsLoadingAI(false); // Always set loading state to false
            // Potentially exit editing mode or refresh view after AI correction if it implies changes
            setIsEditing(false); // Assume AI correction might change fields, so exit editing
        }
    };

    // Handle Cancel button click
    const handleCancel = () => {
        // Revert to original question values
        setEditedQuestionText(question.question);
        setEditedOptions(question.options);
        setEditedAnswer(question.answer);
        setEditedExplanation(question.explanation);
        setIsEditing(false); // Exit editing mode
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">
                    {isEditing ? (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="edit-question-text" className="text-sm font-medium">Question Text:</label>
                            <Textarea
                                id="edit-question-text"
                                value={editedQuestionText}
                                onChange={handleQuestionTextChange}
                                className="w-full"
                                rows={4}
                            />
                        </div>
                    ) : (
                        `Question: ${question.question}`
                    )}
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
                        {Object.entries(editedOptions).map(([key, value]) => (
                            <li key={key} className="flex items-center space-x-2">
                                <span className="font-bold">{key.toUpperCase()})</span>
                                {isEditing ? (
                                    <Textarea
                                        value={value}
                                        onChange={(e) => handleOptionChange(key as keyof TBaseOption, e.target.value)}
                                        className="flex-grow"
                                        rows={2}
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
                    {isEditing ? (
                        <Select value={editedAnswer} onValueChange={handleAnswerChange}>
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
                    ) : (
                        <Badge variant="secondary" className="text-lg">{question.answer.toUpperCase()}</Badge>
                    )}
                </div>

                <div>
                    <h3 className="text-md font-semibold mb-2">Explanation:</h3>
                    {isEditing ? (
                        <Textarea
                            value={editedExplanation}
                            onChange={handleExplanationChange}
                            className="w-full"
                            rows={6}
                        />
                    ) : (
                        <p className="text-gray-700">{question.explanation}</p>
                    )}
                    {question.images?.exp && (
                        <div className="mt-2 flex justify-center">
                            <img src={question.images.exp} alt="Explanation Image" className="max-w-full h-auto rounded-md" />
                        </div>
                    )}
                </div>

                {showReportInfo && question.message && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <h3 className="text-md font-semibold text-red-700">Report Message:</h3>
                        <p className="text-red-600">{question.message}</p>
                    </div>
                )}

                <div className="flex justify-end mt-4 space-x-2">
                    {/* AI Correction Button - always visible and enabled when not loading */}
                    <Button
                        onClick={handleAICorrectionClick}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                        disabled={isLoadingAI || isLoadingSave} // Disable if either operation is loading
                    >
                        {isLoadingAI ? 'Applying AI...' : 'AI Correction'}
                    </Button>

                    {isEditing ? (
                        <>
                            {/* Disable Save button while loading */}
                            <Button
                                onClick={handleSaveClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                disabled={isLoadingSave || isLoadingAI}
                            >
                                {isLoadingSave ? 'Saving...' : 'Save'}
                            </Button>
                            <Button onClick={handleCancel} variant="outline" disabled={isLoadingSave || isLoadingAI}>Cancel</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} disabled={isLoadingAI}>Manually Edit</Button>
                    )}
                </div>
            </CardContent>

            {/* Save Confirmation Dialog */}
            <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Save</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to save these changes to the question? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowSaveDialog(false)} disabled={isLoadingSave}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmSave} disabled={isLoadingSave}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default ReportQuestionCard;
