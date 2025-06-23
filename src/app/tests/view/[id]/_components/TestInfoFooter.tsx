// components/test/TestInfoFooter.tsx

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface TestInfoFooterProps {
    description?: string;
    specialUrl?: string;
    specialImage?: string;
}

const TestInfoFooter: React.FC<TestInfoFooterProps> = ({
    description,
    specialUrl,
    specialImage
}) => {
    if (!description && !specialUrl) {
        return null; // Don't render anything if no info to display
    }

    return (
        <div className=" border-gray-200 dark:border-gray-700">
            {description && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>
                </div>
            )}
            {specialUrl && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">For More Information</h3>
                    <Link
                        href={specialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Visit Official Link
                        {specialImage && (
                            <img
                                src={specialImage}
                                alt="Special Link Icon"
                                className="ml-3 h-6 w-6 object-contain"
                            />
                        )}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TestInfoFooter;