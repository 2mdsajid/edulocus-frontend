'use client'

import React from 'react';
import { TriangleAlert } from 'lucide-react'; // Warning icon
import { Button } from '@/components/ui/button'; // Assuming ShadCN Button component
import Link from 'next/link'; // Assuming Next.js for Link component

type Props = {
    errorMessage?: string; // Made optional
    children?: React.ReactNode; // Optional children prop
}

const ErrorPage = (props: Props) => {
    const { errorMessage, children } = props;

    return (
        <div className="min-h-screen w-screen flex  items-center justify-center absolute top-0  left-0 text-gray-800 ">
            <div className=" p-8 sm:p-10 rounded-2xl  text-center max-w-lg w-full ">
                {/* Warning Icon */}
                <TriangleAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-bounce-in" />

                {/* Error Message */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Oops!
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                    {errorMessage || 'Something went wrong!'}
                </p>

                {/* Conditional Children Rendering */}
                {children ? (
                    <div className="text-gray-600 text-lg leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        {children}
                    </div>
                ) : (
                    <>
                        {/* Descriptive Text for User */}
                        <p className="text-gray-500 text-md mb-8 max-w-sm mx-auto">
                            We&apos;re sorry for the inconvenience. Please try one of the options below.
                        </p>

                        {/* Buttons (only rendered if no children are passed) */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => window.history.back()}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Go Back
                            </Button>
                            <Link href="/" passHref>
                                <Button
                                    variant="outline"
                                    className="border-gray-600 text-gray-600 hover:bg-gray-50 hover:text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                >
                                    Go to Homepage
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ErrorPage;