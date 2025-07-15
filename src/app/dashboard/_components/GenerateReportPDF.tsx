"use client";

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { TDashboardAnalyticData } from '@/lib/schema/analytics.schema'; // Adjust path
import { useToast } from '@/hooks/use-toast';

// --- Main Component ---
type GenerateReportPDFProps = {
    analyticsData: TDashboardAnalyticData;
    buttonText?: string;
    className?: string;
};

export const GenerateReportPDF = ({
    analyticsData,
    buttonText = "Download Full Report",
    className
}: GenerateReportPDFProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    
    const handleGenerateReport = async () => {
        setIsGenerating(true);
        toast({
            title: "Generating Report...",
            description: "Please wait while your PDF is being prepared.",
        });

        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const docWidth = doc.internal.pageSize.getWidth();
            const margin = 15;

            // Page 1: Contains Summary and Recommendations
            addSummaryAndRecommendationsPage(doc, analyticsData, docWidth, margin);

            // Page 2: Contains Progress Over Time
            doc.addPage();
            addProgressPage(doc, analyticsData, docWidth, margin);

            // Page 3 onwards: Contains Detailed Subject Breakdown
            addDetailedBreakdownPages(doc, analyticsData, docWidth, margin);

            addPdfCommonElements(doc, (doc as any).internal.getNumberOfPages(), "Performance_Report");

            toast({
                title: "Report Generated!",
                description: "Your PDF download should start shortly.",
                variant: "success",
            });

        } catch (error) {
            console.error("Failed to generate PDF report:", error);
            toast({
                title: "Report Generation Failed",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button onClick={handleGenerateReport} disabled={isGenerating} className={className}>
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            {buttonText}
        </Button>
    );
};

// --- PDF Page Generation Functions ---

// Helper function to draw recommendations
function addRecommendations(doc: jsPDF, data: TDashboardAnalyticData, margin: number, initialY: number): number {
    let yPos = initialY;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Recommendations", margin, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Focus on Your Weakest Subjects:", margin, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    data.performance.subjects.insights.weakest.forEach(item => {
        doc.text(`• ${item.name.replace(/_/g, ' ')} (Accuracy: ${item.accuracy}%)`, margin + 5, yPos);
        yPos += 6;
    });

    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Focus on Your Weakest Chapters:", margin, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    Object.values(data.performance.chapters.insights).flatMap(insight => insight.weakest).slice(0, 5).forEach(item => {
        doc.text(`• ${item.name.replace(/_/g, ' ')} (Accuracy: ${item.accuracy}%)`, margin + 5, yPos);
        yPos += 6;
    });
    
    return yPos;
}

// Page 1: Summary + Recommendations
function addSummaryAndRecommendationsPage(doc: jsPDF, data: TDashboardAnalyticData, docWidth: number, margin: number) {
    let yPos = margin;
    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("EduLocus Performance Report", docWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Report generated on: ${new Date().toLocaleDateString('en-GB')}`, docWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Key Metrics
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Overall Summary", margin, yPos);
    yPos += 8;

    const metrics = [
        { label: "Total Tests Taken", value: data.totalTests },
        { label: "Total Questions", value: data.totalQuestionsAttempt },
        { label: "Correct Answers", value: data.totalCorrectAnswers },
        { label: "Overall Accuracy", value: `${data.averageAccuracy}%` },
    ];
    
    doc.setFontSize(11);
    metrics.forEach(metric => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${metric.label}:`, margin + 5, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(String(metric.value), margin + 55, yPos);
        yPos += 7;
    });

    // Score Breakdown
    yPos += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Questions Score Breakdown", margin, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    data.scoreParametersData.forEach(item => {
        const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        doc.text(`• ${label}: ${item.value}`, margin + 5, yPos);
        yPos += 7;
    });

    // Add Recommendations to fill the page
    yPos += 15;
    addRecommendations(doc, data, margin, yPos);
}

// Page 2: Progress Over Time
function addProgressPage(doc: jsPDF, data: TDashboardAnalyticData, docWidth: number, margin: number) {
    let yPos = margin;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Performance Over Time", docWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    const tableHead = [["Date", "Score (%)"]];
    const tableBody = data.dailyTestProgressChartData.map(item => [item.date, item.score]);

    autoTable(doc, {
        startY: yPos,
        head: tableHead,
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });
}

// Page 3+: Detailed Subject Breakdown
function addDetailedBreakdownPages(doc: jsPDF, data: TDashboardAnalyticData, docWidth: number, margin: number) {
    doc.addPage();
    let yPos = margin;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Detailed Performance Breakdown", docWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    Object.entries(data.performance.chapters.stats).forEach(([subjectName, chapterStats]) => {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        
        const tableHead = [["Chapter", "Total", "Correct", "Incorrect", "Accuracy (%)"]];
        
        // FIX: Sort chapters by accuracy in descending order before creating the table body.
        const tableBody = Object.entries(chapterStats)
            .sort(([, statsA], [, statsB]) => statsB.accuracy - statsA.accuracy)
            .map(([chapterName, stats]) => [
                chapterName.replace(/_/g, ' '),
                stats.total,
                stats.correct,
                stats.incorrect,
                `${stats.accuracy}%`
            ]);

        // Check if there is enough space for the table header and at least one row
        if (yPos + 30 > doc.internal.pageSize.getHeight()) {
            doc.addPage();
            yPos = margin;
        }

        doc.text(`Subject: ${subjectName.replace(/_/g, ' ')}`, margin, yPos);
        
        autoTable(doc, {
            startY: yPos + 8,
            head: tableHead,
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            didDrawPage: (hookData) => {
                yPos = hookData.cursor?.y ?? margin;
            }
        });
        yPos = (doc as any).lastAutoTable.finalY + 15;
    });
}

const addPdfCommonElements = (doc: jsPDF, totalPages: number, testName: string) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 25, pageHeight - 10);
        doc.text('EduLocus Performance Report | www.edulocusweb.com', 15, pageHeight - 10);
    }
    const fileName = `${testName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};