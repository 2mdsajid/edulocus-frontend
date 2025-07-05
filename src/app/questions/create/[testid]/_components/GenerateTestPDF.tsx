// components/generate-test-pdf.tsx
"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TBaseOption, TQuestion } from '@/lib/schema/tests.schema'; // Make sure these types are correct
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Keep this import if you use autoTable for other things, though not directly for questions here
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


// --- Helper Function: stripHtmlTags (remains the same) ---
const stripHtmlTags = (html?: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
};


// --- Refactored PDF Generation Logic (Moved out of component) ---

// Type for PDF generation options
interface PdfOptions {
    questions: TQuestion[];
    testName: string;
    isOneQuestionPerPage: boolean; // New flag for variation
}

// Common PDF setup function (watermark, page numbers, footnote)
const addPdfCommonElements = (doc: jsPDF, totalPages: number, testName: string) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    const watermarkText = 'edulocusweb.com';
    const watermarkFontSize = 40;
    const watermarkOpacity = 0.1;
    const watermarkColor: [number, number, number] = [0, 0, 0]; // Black

    const footnoteText = 'Visit edulocusweb.com for more free resources';
    const footnoteUrl = 'https://www.edulocusweb.com';
    const footnoteFontSize = 7;
    const footnoteColor: [number, number, number] = [0, 0, 255]; // Blue

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        // Add watermark
        doc.saveGraphicsState();
        // Explicitly cast to 'any' for GState if TypeScript complains
        doc.setGState(new (doc as any).GState({ opacity: watermarkOpacity }));
        doc.setTextColor(watermarkColor[0], watermarkColor[1], watermarkColor[2]);
        doc.setFontSize(watermarkFontSize);
        doc.setFont('Arial', 'normal');

        const textWidth = doc.getStringUnitWidth(watermarkText) * watermarkFontSize / doc.internal.scaleFactor;
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;
        doc.text(watermarkText, centerX, centerY, { angle: 45, align: 'center', baseline: 'middle' });
        doc.restoreGraphicsState();

        // Reset text color to black before adding page numbers and footnote
        doc.setTextColor(0, 0, 0);

        // Add page numbers
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 25, pageHeight - 10);

        // Add footnote
        doc.setFontSize(footnoteFontSize);
        doc.setTextColor(footnoteColor[0], footnoteColor[1], footnoteColor[2]);
        doc.text(footnoteText, margin, pageHeight - 5);

        // Add hyperlink
        doc.link(
            margin,
            pageHeight - 5 - footnoteFontSize / 2,
            doc.getStringUnitWidth(footnoteText) * footnoteFontSize / doc.internal.scaleFactor,
            footnoteFontSize,
            { url: footnoteUrl }
        );
    }
    // Save PDF
    const fileName = `${testName.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
};


// --- MODIFIED FUNCTION ---
// Function for multi-column PDF generation
const generateMultiColumnPDF = ({ questions, testName }: PdfOptions): jsPDF => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const fontSize = 8;
    doc.setFontSize(fontSize);
    doc.setFont('Arial', 'normal');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const bottomMargin = 15;
    const colWidth = (pageWidth - margin * 3) / 2;
    const questionSpacing = 8;

    // Add test name as title on first page only
    doc.setFontSize(16);
    doc.setFont('Arial', 'bold');
    doc.text(testName, margin, margin + 5);
    doc.setFontSize(fontSize);
    doc.setFont('Arial', 'normal');

    // Group questions by subject
    const questionsBySubject: { [subject: string]: TQuestion[] } = {};
    questions.forEach(question => {
        if (!questionsBySubject[question.subject]) {
            questionsBySubject[question.subject] = [];
        }
        questionsBySubject[question.subject].push(question);
    });

    const subjectsToInclude = Object.keys(questionsBySubject);

    // Track current layout state
    let yPos = margin + 20; // Initial Y position after title
    let isLeftColumn = true;
    let xPos = margin;

    subjectsToInclude.forEach((subject, subjectIndex) => {
        // ---- CHANGE START ----
        // If this is not the first subject, start it on a completely new page.
        if (subjectIndex > 0) {
            doc.addPage();
            yPos = margin + 10; // Reset Y position for the new page
            isLeftColumn = true; // Start in the left column
            xPos = margin;
        }
        // ---- CHANGE END ----

        // Add subject heading
        doc.setFontSize(12);
        doc.setFont('Arial', 'bold');
        doc.text(`${subject.toUpperCase().replace(/\s+/g, '-')}`, pageWidth / 2, yPos, { align: 'center' });
        yPos += 8; // Space after subject heading
        doc.setFontSize(fontSize);
        doc.setFont('Arial', 'normal');

        const subjectQuestions = questionsBySubject[subject] || [];

        subjectQuestions.forEach((question, index) => {
            const questionNumber = index + 1;

            const cleanQuestion = stripHtmlTags(question.question);
            const cleanOptions = question.options ? {
                a: stripHtmlTags(question.options.a),
                b: stripHtmlTags(question.options.b),
                c: stripHtmlTags(question.options.c),
                d: stripHtmlTags(question.options.d)
            } : null;
            const cleanAnswer = stripHtmlTags(question.answer);
            const cleanExplanation = stripHtmlTags(question.explanation);

            let estimatedHeight = 3.5; // Question number
            estimatedHeight += doc.splitTextToSize(cleanQuestion, colWidth - 5).length * 3.5;

            const optionLabels = ['A', 'B', 'C', 'D'];
            optionLabels.forEach(label => {
                if (cleanOptions && cleanOptions[label.toLowerCase() as keyof TBaseOption]) {
                    estimatedHeight += doc.splitTextToSize(
                        cleanOptions[label.toLowerCase() as keyof TBaseOption],
                        colWidth - 10
                    ).length * 3.5;
                }
            });

            if (cleanAnswer) estimatedHeight += 3.5;
            if (cleanExplanation) estimatedHeight += (doc.splitTextToSize(cleanExplanation, colWidth - 5).length + 1) * 3.5;
            estimatedHeight += questionSpacing;

            // Check if content fits in the current column. If not, move to the next.
            if (yPos + estimatedHeight > pageHeight - bottomMargin) {
                if (isLeftColumn) {
                    isLeftColumn = false;
                    xPos = margin * 2 + colWidth;
                    yPos = margin + 10; // Reset yPos for the new column
                } else {
                    doc.addPage();
                    isLeftColumn = true;
                    xPos = margin;
                    yPos = margin + 10; // Reset yPos for the new page
                }
            }

            // Draw question content
            doc.setFont('Arial', 'bold');
            doc.text(`Q.${questionNumber}:`, xPos, yPos);
            yPos += 3.5;

            doc.setFont('Arial', 'normal');
            const questionLines = doc.splitTextToSize(cleanQuestion, colWidth - 5);
            doc.text(questionLines, xPos, yPos);
            yPos += questionLines.length * 3.5;

            optionLabels.forEach(label => {
                if (cleanOptions && cleanOptions[label.toLowerCase() as keyof TBaseOption]) {
                    doc.setFont('Arial', 'bold');
                    doc.text(`${label}: `, xPos, yPos);
                    doc.setFont('Arial', 'normal');

                    const optionText = doc.splitTextToSize(
                        cleanOptions[label.toLowerCase() as keyof TBaseOption],
                        colWidth - 10
                    );
                    doc.text(optionText, xPos + 5, yPos);
                    yPos += optionText.length * 3.5;
                }
            });

            if (cleanAnswer) {
                doc.setFont('Arial', 'bold');
                doc.text(`Answer:`, xPos, yPos);
                doc.setFont('Arial', 'normal');
                doc.text(cleanAnswer, xPos + 12, yPos);
                yPos += 3.5;
            }

            if (cleanExplanation) {
                doc.setFont('Arial', 'bold');
                doc.text(`Explanation:`, xPos, yPos);
                yPos += 3.5;
                doc.setFont('Arial', 'normal');
                const explanationText = doc.splitTextToSize(cleanExplanation, colWidth - 5);
                doc.text(explanationText, xPos, yPos);
                yPos += explanationText.length * 3.5;
            }

            yPos += questionSpacing / 2;
            doc.setDrawColor(200, 200, 200);
            doc.line(xPos, yPos, xPos + colWidth - 5, yPos);
            yPos += questionSpacing / 2;
        });
    });

    return doc;
};

// --- UNCHANGED FUNCTIONS ---
// Function for one-question-per-page PDF generation (New Variation)
const generateOneQuestionPerPagePDF = ({ questions, testName }: PdfOptions): jsPDF => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const baseFontSize = 12; // Larger font for single question per page
    doc.setFontSize(baseFontSize);
    doc.setFont('Arial', 'normal');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15; // Slightly larger margin for single question per page

    // Add test name as title on first page only
    doc.setFontSize(20);
    doc.setFont('Arial', 'bold');
    doc.text(testName, pageWidth / 2, margin + 5, { align: 'center' });
    doc.setFontSize(baseFontSize);
    doc.setFont('Arial', 'normal');

    // Add questions
    questions.forEach((question, index) => {
        if (index > 0) { // Add new page for each question except the first one
            doc.addPage();
        }

        let yPos = margin + 20; // Start position for content on each page

        const questionNumber = index + 1;

        const cleanQuestion = stripHtmlTags(question.question);
        const cleanOptions = question.options ? {
            a: stripHtmlTags(question.options.a),
            b: stripHtmlTags(question.options.b),
            c: stripHtmlTags(question.options.c),
            d: stripHtmlTags(question.options.d)
        } : null;
        const cleanAnswer = stripHtmlTags(question.answer);
        const cleanExplanation = stripHtmlTags(question.explanation);

        // Draw question number
        doc.setFontSize(baseFontSize + 2); // Slightly larger for question number
        doc.setFont('Arial', 'bold');
        doc.text(`Q.${questionNumber}:`, margin, yPos);
        yPos += 7; // Move to next line

        // Question text
        doc.setFontSize(baseFontSize);
        doc.setFont('Arial', 'normal');
        const questionText = doc.splitTextToSize(cleanQuestion, pageWidth - 2 * margin);
        doc.text(questionText, margin, yPos);
        yPos += questionText.length * (baseFontSize / 2.5) + 10; // Adjust line height + spacing

        // Add options
        const optionLabels = ['A', 'B', 'C', 'D'];
        optionLabels.forEach(label => {
            if (cleanOptions && cleanOptions[label.toLowerCase() as keyof TBaseOption]) {
                doc.setFontSize(baseFontSize);
                doc.setFont('Arial', 'bold');
                doc.text(`${label}: `, margin, yPos);
                doc.setFont('Arial', 'normal');

                const optionText = doc.splitTextToSize(
                    cleanOptions[label.toLowerCase() as keyof TBaseOption],
                    pageWidth - 2 * margin - 10 // Adjust for option label indent
                );
                doc.text(optionText, margin + 8, yPos); // Indent options
                yPos += optionText.length * (baseFontSize / 2.5) + 5; // Adjust line height + spacing
            }
        });

        // Add answer (can be on the same page or next depending on preference)
        if (cleanAnswer) {
             yPos += 10; // Add some space before answer
            doc.setFontSize(baseFontSize + 1);
            doc.setFont('Arial', 'bold');
            doc.text(`Answer: `, margin, yPos);
            doc.setFont('Arial', 'normal');
            doc.text(`${cleanAnswer}`, margin + 15, yPos);
            yPos += 7;
        }

        // Add explanation if available (consider putting this on a new page if very long)
        if (cleanExplanation) {
            yPos += 10; // Add some space before explanation
            doc.setFontSize(baseFontSize + 1);
            doc.setFont('Arial', 'bold');
            doc.text(`Explanation: `, margin, yPos);
            doc.setFont('Arial', 'normal');

            const explanationText = doc.splitTextToSize(cleanExplanation, pageWidth - 2 * margin);
            doc.text(explanationText, margin, yPos + 7);
            yPos += (explanationText.length * (baseFontSize / 2.5)) + 10;
        }
    });

    return doc;
};


// Main Component (Unchanged)
interface GenerateTestPDFProps {
    questions: TQuestion[];
    testName: string;
    buttonText?: string;
    className?: string;
}

const GenerateTestPDF: React.FC<GenerateTestPDFProps> = ({
    questions,
    testName,
    buttonText = "Download Questions PDF",
    className = "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState<"multi-column" | "one-question-per-page">("multi-column");
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        toast({
            title: "Generating PDF...",
            description: "Please wait while your PDF is being prepared.",
            duration: 3000,
        });

        try {
            let doc: jsPDF;
            const pdfOptions = { questions, testName, isOneQuestionPerPage: selectedVariation === "one-question-per-page" };

            if (selectedVariation === "one-question-per-page") {
                doc = generateOneQuestionPerPagePDF(pdfOptions);
            } else {
                doc = generateMultiColumnPDF(pdfOptions);
            }

            // Add common elements after content generation
            addPdfCommonElements(doc, doc.internal.pages.length, testName);

            toast({
                title: "PDF Generated!",
                description: "Your PDF download should start shortly.",
                variant: "success",
            });
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            toast({
                title: "PDF Generation Failed",
                description: "An error occurred while generating the PDF. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
            setIsDialogOpen(false); // Close dialog after generation
        }
    };


    return (
        <>
            <Button
                onClick={() => setIsDialogOpen(true)}
                className={className}
            >
                {buttonText}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select PDF Layout</DialogTitle>
                        <DialogDescription>
                            Choose how you would like the questions to be arranged in the PDF.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <RadioGroup
                            value={selectedVariation}
                            onValueChange={(value: "multi-column" | "one-question-per-page") => setSelectedVariation(value)}
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="multi-column" id="r1" />
                                <Label htmlFor="r1">Multi-Column Layout (Compact)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="one-question-per-page" id="r2" />
                                <Label htmlFor="r2">One Question Per Page (Large Font)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleDownloadPDF} disabled={isGenerating}>
                            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Download PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GenerateTestPDF;