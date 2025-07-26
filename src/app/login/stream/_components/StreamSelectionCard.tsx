'use client'

import { TStream } from '@/lib/schema/users.schema'
import React from 'react'
import { cn } from '@/lib/utils'; // Assuming you have a utility for merging class names

type Props = {
    title: string;
    description: string;
    stream: TStream;
    isSelected: boolean;
    onSelect: (stream: TStream) => void;
}

const StreamSelectionCard = ({ title, description, stream, isSelected, onSelect }: Props) => {
    return (
        <button
            onClick={() => onSelect(stream)}
            className={cn(
                "p-8 md:p-12 w-64 h-48 flex flex-col items-center justify-center text-center",
                "bg-white dark:bg-slate-800",
                "border-2 border-transparent rounded-xl shadow-lg",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-2xl hover:-translate-y-2 focus:outline-none",
                {
                    "ring-4 ring-offset-2 ring-blue-500 dark:ring-blue-400 border-blue-500 dark:border-blue-400": isSelected,
                    "hover:border-slate-300 dark:hover:border-slate-600": !isSelected,
                }
            )}
        >
            <div className="text-3xl font-bold text-slate-800 dark:text-white">{title}</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</div>
        </button>
    )
}

export default StreamSelectionCard;