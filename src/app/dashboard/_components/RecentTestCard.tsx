import React from 'react'
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // assuming ShadCN card components are here
import { Button } from '@/components/ui/button'; // ShadCN button
import { CalendarIcon, CheckCircleIcon } from 'lucide-react';

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
        <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
          <p className="text-sm flex items-center opacity-80">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {new Date(date).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Questions: <span className="font-semibold">{totalQuestions}</span>
              </p>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
                <p className="text-sm font-medium">
                  Score: <span className="text-green-600 dark:text-green-400">{score}%</span>
                </p>
              </div>
            </div>
            <Link href={`/dashboard/view/${id}`}>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
}

export default RecentTestCard