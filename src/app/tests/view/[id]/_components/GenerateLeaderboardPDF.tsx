// components/test/GenerateLeaderboardPDF.tsx
"use client";

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
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // <--- CHANGED THIS LINE
import { Loader2, Download } from 'lucide-react';

// Define the type for ranked users (matches your provided type)
interface RankedUser {
    rank: number;
    username: string;
    totalScore: number;
}

interface GenerateLeaderboardPDFProps {
    rankedUsers: RankedUser[];
    testName: string;
    testDate: Date; // Assuming a Date object for formatting
    description?: string;
    buttonText?: string;
    className?: string;
}


// --- Common PDF Elements Helper (can be shared with other PDF components) ---
// This function adds watermarks, page numbers, and footnotes to a jsPDF document.
// You could place this in a shared utility file (e.g., `lib/pdf-utils.ts`) if it's used across multiple PDF generators.
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
    // Save PDF (this should be the final step after common elements are added)
    const fileName = `${testName.replace(/\s+/g, '_')}_Leaderboard.pdf`;
    doc.save(fileName);
};


const GenerateLeaderboardPDF: React.FC<GenerateLeaderboardPDFProps> = ({
    rankedUsers,
    testName,
    testDate,
    description,
    buttonText = "Download Leaderboard PDF",
    className = "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded" // Distinct color for Leaderboard PDF
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const generateLeaderboardPDF = async () => {
        setIsGenerating(true);
        toast({
            title: "Generating Leaderboard PDF...",
            description: "Please wait while the PDF is prepared.",
            duration: 3000,
        });

        try {
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            let yOffset = 10; // Initial Y position for content
            const margin = 10;
            const pageWidth = doc.internal.pageSize.getWidth();

            // Test Name
            doc.setFontSize(18);
            doc.setFont('Arial', 'bold');
            doc.text(testName, pageWidth / 2, yOffset, { align: 'center' });
            yOffset += 8;

            // Test Date
            doc.setFontSize(10);
            doc.setFont('Arial', 'normal');
            const formattedDate = new Date(testDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            doc.text(`Date: ${formattedDate}`, pageWidth / 2, yOffset, { align: 'center' });
            yOffset += 8;

            // Description (if exists)
            if (description) {
                doc.setFontSize(9);
                doc.setFont('Arial', 'italic');
                const splitDescription = doc.splitTextToSize(description, pageWidth - 2 * margin);
                doc.text(splitDescription, margin, yOffset);
                yOffset += (splitDescription.length * 4) + 10; // Adjust line height + spacing
            }

            // AutoTable for Leaderboard
            // No longer casting to any if autoTable is properly imported
            autoTable(doc, { // <--- CHANGED THIS LINE
                startY: yOffset, // Start table after headers/description
                head: [['Rank', 'Username', 'Total Score']],
                body: rankedUsers.map(user => [user.rank, user.username, user.totalScore]),
                theme: 'striped', // Optional: 'grid', 'plain', 'striped'
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                    halign: 'center', // Center align content in cells
                },
                headStyles: {
                    fillColor: [68, 138, 255], // A shade of blue for header
                    textColor: [255, 255, 255], // White text for header
                    fontStyle: 'bold',
                },
                columnStyles: {
                    0: { cellWidth: 20 }, // Rank column width
                    1: { halign: 'left' }, // Username left-aligned
                    2: { cellWidth: 30 }, // Score column width
                },
                margin: { left: margin, right: margin },
                didDrawPage: (data: any) => {
                    // This callback is useful if you want to add content specific to the table drawing
                    // e.g., if table spans multiple pages, you can add headers again
                }
            });

            // Add common elements after the main content and table
            addPdfCommonElements(doc, doc.internal.pages.length, testName);

            toast({
                title: "PDF Generated!",
                description: "The leaderboard PDF download should start shortly.",
                variant: "success",
            });

        } catch (error) {
            console.error("Failed to generate Leaderboard PDF:", error);
            toast({
                title: "PDF Generation Failed",
                description: "An error occurred while generating the Leaderboard PDF. Please try again.",
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
                <Download className="mr-2 h-4 w-4" />
                {buttonText}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Download Leaderboard</DialogTitle>
                        <DialogDescription>
                            Confirm to generate and download the leaderboard for &quot;{testName}&quot;.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-gray-700">
                            The PDF will contain the ranks, usernames, and scores of all participants.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={generateLeaderboardPDF} disabled={isGenerating}>
                            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GenerateLeaderboardPDF;