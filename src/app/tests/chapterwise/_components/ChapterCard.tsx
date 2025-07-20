import { ArrowRight, Bookmark, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ChapterWiseStartButton from './ChapterWiseStartButton';

type Props = {
    chapter: string
    count: number
    selectedSubject: string
}

const ChapterCard = (props: Props) => {
    // Construct the link for starting the test, ensuring parts are URL-friendly
    // const href = `/tests/start?subject=${encodeURIComponent(props.selectedSubject)}&chapter=${encodeURIComponent(props.chapter)}`;

    return (
            <div className="flex flex-col h-full overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-600">
                
                {/* Icon */}
                <div className="mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Bookmark className="h-8 w-8" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold capitalize text-gray-900 dark:text-white flex-grow">
                    {props.chapter.replace(/_/g, ' ')}
                </h3>
                
                {/* Metadata Badge for Question Count */}
                <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                        <HelpCircle className="h-4 w-4" />
                        {props.count} Questions
                    </span>
                </div>

                {/* Call to Action (revealed on hover) */}
                {/* <div className="mt-auto pt-6">
                    <div className="flex items-center font-semibold text-purple-600">
                        Start Practice
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div> */}
                <ChapterWiseStartButton subject={props.selectedSubject} chapter={props.chapter} />
            </div>
    );
}

export default ChapterCard;