import { Button } from '@/components/ui/button';
import { TBaseOption, TQuestion } from '@/lib/schema/tests.schema';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import React from 'react';

interface GenerateTestPDFProps {
    questions: TQuestion[];
    testName: string;
    buttonText?: string;
    className?: string;
}

// Helper function to strip HTML tags
const stripHtmlTags = (html?: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
};

const GenerateTestPDF: React.FC<GenerateTestPDFProps> = ({
    questions,
    testName,
    buttonText = "Download Questions PDF",
    className = "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
}) => {
    const generateTestPDF = () => {
        // Create new PDF document - A4 format
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Set smaller font size
        const fontSize = 8;
        doc.setFontSize(fontSize);

        // PDF dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const bottomMargin = 15;  // Increased bottom margin
        const colWidth = (pageWidth - margin * 3) / 2; // Width of each column
        const questionSpacing = 8; // Space between questions


        // Add test name as title on first page only
        doc.setFontSize(16);
        doc.setFont('Arial', 'bold');
        doc.text(testName, 5, margin , { align: 'left' });
        doc.setFontSize(fontSize);
        doc.setFont('Arial', 'normal');

        // Reset positions after title
        // let yPos = margin + 20; // Increased starting position to account for title

        // Group questions by subject
        const questionsBySubject: { [subject: string]: any[] } = {};
        questions.forEach(question => {
            if (!questionsBySubject[question.subject]) {
                questionsBySubject[question.subject] = [];
            }
            questionsBySubject[question.subject].push(question);
        });

        // If a specific subject is selected, only include that subject
        const subjectsToInclude = Object.keys(questionsBySubject);

        // Process each subject
        subjectsToInclude.forEach((subject, subjectIndex) => {
            // Start a new page for each subject (except the first one)
            if (subjectIndex > 0) {
                doc.addPage();
            }

            // Reset positions for new subject
            let yPos = margin + 10;
            let isLeftColumn = true;
            let xPos = margin;

            // Add subject heading
            doc.setFontSize(12);
            doc.setFont('Arial', 'bold');
            doc.text(`${subject.toUpperCase().replace(' ', '-')}`, pageWidth / 2, margin, { align: 'center' });

            // Reset font
            doc.setFontSize(fontSize);
            doc.setFont('Arial', 'normal');

            // Get questions for this subject
            const questions = questionsBySubject[subject] || [];

            // Add questions
            questions.forEach((question, index) => {
                const questionNumber = index + 1;

                // Strip HTML tags from question content
                const cleanQuestion = stripHtmlTags(question.question);
                const cleanOptions = question.options ? {
                    a: stripHtmlTags(question.options.a),
                    b: stripHtmlTags(question.options.b),
                    c: stripHtmlTags(question.options.c),
                    d: stripHtmlTags(question.options.d)
                } : null;
                const cleanAnswer = stripHtmlTags(question.answer);
                const cleanExplanation = stripHtmlTags(question.explanation);

                // Calculate approximately how much space this question will take
                let estimatedHeight = 3.5; // Question number

                // Question text (estimate)
                const questionText = doc.splitTextToSize(cleanQuestion, colWidth - 5);
                estimatedHeight += questionText.length * 3.5;

                // Options (estimate)
                const optionLabels = ['A', 'B', 'C', 'D'];
                optionLabels.forEach(label => {
                    if (cleanOptions && cleanOptions[label.toLowerCase() as keyof TBaseOption]) {
                        const optionText = doc.splitTextToSize(
                            cleanOptions[label.toLowerCase() as keyof TBaseOption],
                            colWidth - 10
                        );
                        estimatedHeight += optionText.length * 3.5;
                    }
                });

                // Answer (estimate)
                if (cleanAnswer) {
                    estimatedHeight += 3.5;
                }

                // Explanation (estimate)
                if (cleanExplanation) {
                    const explanationText = doc.splitTextToSize(cleanExplanation, colWidth - 5);
                    estimatedHeight += (explanationText.length + 1) * 3.5;
                }

                // Add extra for metadata and spacing
                estimatedHeight += questionSpacing + 10;

                // Check if we need to move to a new column or page based on estimated height
                if (yPos + estimatedHeight > pageHeight - bottomMargin) {
                    if (isLeftColumn) {
                        // Move to right column
                        isLeftColumn = false;
                        xPos = margin * 2 + colWidth;
                        yPos = margin + 10;
                    } else {
                        // New page
                        doc.addPage();
                        isLeftColumn = true;
                        xPos = margin;
                        yPos = margin + 10;
                    }
                }

                // Draw question number
                doc.setFont('Arial', 'bold');
                doc.text(`Q.${questionNumber}:`, xPos, yPos);
                yPos += 3.5; // Move to next line

                // Question text
                doc.setFont('Arial', 'normal');
                doc.text(questionText, xPos, yPos);
                yPos += questionText.length * 3.5;

                // Add options
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

                // Add answer with proper spacing
                if (cleanAnswer) {
                    doc.setFont('Arial', 'bold');
                    doc.text(`Answer : `, xPos, yPos);
                    doc.setFont('Arial', 'normal');
                    doc.text(`${cleanAnswer}`, xPos + 12, yPos);
                    yPos += 3.5;
                }

                // Add explanation if available
                if (cleanExplanation) {
                    doc.setFont('Arial', 'bold');
                    doc.text(`Explanation: `, xPos, yPos);
                    doc.setFont('Arial', 'normal');

                    const explanationText = doc.splitTextToSize(cleanExplanation, colWidth - 5);
                    doc.text(explanationText, xPos, yPos + 3.5);
                    yPos += (explanationText.length + 1) * 3.5;
                }

                // Draw a separator line
                doc.setDrawColor(200, 200, 200);
                doc.line(xPos, yPos, xPos + colWidth - 5, yPos);

                // Add consistent spacing between questions (after the separator line)
                yPos += questionSpacing;
            });
        });

        // Add page numbers, watermark, and footnote
        const totalPages = doc.internal.pages.length;
        const watermarkText = 'edulocusweb.com';
        const watermarkFontSize = 40; // Adjust as needed
        const watermarkOpacity = 0.1; // Make it light
        const watermarkColor = [0, 0, 0]; // Black color for the watermark

        // Footnote details
        const footnoteText = 'Visit edulocusweb.com for more free resources';
        const footnoteUrl = 'https://www.edulocusweb.com';
        const footnoteFontSize = 7; // Smaller for a footnote
        const footnoteColor = [0, 0, 255]; // Blue for hyperlink appearance

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);

            // Add watermark
            doc.saveGraphicsState(); // Save current graphics state
            // Explicitly cast to 'any' to resolve TypeScript error if not using type augmentation
            doc.setGState(new (doc.GState as any)({ opacity: watermarkOpacity }));
            doc.setTextColor(watermarkColor[0], watermarkColor[1], watermarkColor[2]); // Set color
            doc.setFontSize(watermarkFontSize);
            doc.setFont('Arial', 'normal'); // Set font for watermark

            // Calculate position for centered and rotated watermark
            const textWidth = doc.getStringUnitWidth(watermarkText) * watermarkFontSize / doc.internal.scaleFactor;
            const textHeight = watermarkFontSize / doc.internal.scaleFactor; // Approx height

            // Center of the page
            const centerX = pageWidth / 2;
            const centerY = pageHeight / 2;

            // Rotate and position
            doc.text(
                watermarkText,
                centerX,
                centerY,
                {
                    angle: 45, // Rotate 45 degrees
                    align: 'center',
                    baseline: 'middle'
                }
            );
            doc.restoreGraphicsState(); // Restore previous graphics state

            // Reset text color to black before adding page numbers and footnote
            doc.setTextColor(0, 0, 0);

            // Add page numbers
            doc.setFontSize(8);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 25, pageHeight - 10);

            // Add footnote
            doc.setFontSize(footnoteFontSize);
            doc.setTextColor(footnoteColor[0], footnoteColor[1], footnoteColor[2]); // Set blue for hyperlink
            doc.text(footnoteText, margin, pageHeight - 5); // Position footnote at bottom left

            // Add hyperlink (this creates an invisible clickable area)
            // The 1, 1 are adjustments for the bounding box. You might need to tweak them.
            // The textHeight ensures the clickable area covers the text vertically.
            doc.link(
                margin,                                         // x-coordinate of the link
                pageHeight - 5 - footnoteFontSize / 2,          // y-coordinate of the link (adjust for text baseline)
                doc.getStringUnitWidth(footnoteText) * footnoteFontSize / doc.internal.scaleFactor, // width of the link
                footnoteFontSize,                               // height of the link
                { url: footnoteUrl }                            // the URL
            );
        }

        // Save PDF
        const fileName = `${testName.replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);
    };

    return (
        <Button
            onClick={generateTestPDF}
            className={className}
        >
            {buttonText}
        </Button>
    );
};

export default GenerateTestPDF;