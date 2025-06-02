import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // ShadCN card components
import { Button } from '@/components/ui/button'; // ShadCN button
import { CalendarIcon, CheckCircle2Icon, BookOpenTextIcon } from 'lucide-react'; // Icons for clarity

type Props = {
    id: string;
    name: string;
    date: string;
    totalQuestions: number;
    score: number; // Assuming score is a percentage (e.g., 85 for 85%)
}

const RecentTestCard = (props: Props) => {
    const { id, name, date, totalQuestions, score } = props;

    // Determine score color based on performance
    const scoreColorClass = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-700' : 'text-red-700';

    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-200 rounded-lg">
            <CardHeader className="bg-blue-50 p-5 border-b border-blue-100">
                <CardTitle className="text-xl font-bold truncate mb-1 text-gray-800">{name}</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-5 flex flex-col justify-between">
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                        <BookOpenTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="font-medium">Total Questions:</span> <span className="ml-2 font-semibold">{totalQuestions}</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle2Icon className="w-5 h-5 mr-2 text-emerald-600" />
                        <span className="font-medium">Your Score:</span>
                        <span className={`ml-2 font-bold text-lg ${scoreColorClass}`}>{score}%</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {/* <Link href={`/dashboard/view/${id}`} passHref>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200 shadow-md">
                            View Details
                        </Button>
                    </Link> */}
                    <Link href={`/tests/retake/${id}`} passHref>
                        <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold py-2 rounded-md transition-colors duration-200">
                            Re-attempt Test
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentTestCard;