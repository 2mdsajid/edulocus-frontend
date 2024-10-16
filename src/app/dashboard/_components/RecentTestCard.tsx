import React from 'react'
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // assuming ShadCN card components are here
import { Button } from '@/components/ui/button'; // ShadCN button

type Props = {
    id: string;
    name: string;
    date: string;
    totalQuestions: number;
    score: number;
}

const RecentTestCard = (props: Props) => {
    const { id, name, date, totalQuestions, score } = props
    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Date: {new Date(date).toLocaleDateString()}
                </p>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div>
                    <p className="text-sm">
                        Questions: {totalQuestions} | Score: {score}%
                    </p>
                </div>
                <Link href={`/dashboard/view/${id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        View
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default RecentTestCard