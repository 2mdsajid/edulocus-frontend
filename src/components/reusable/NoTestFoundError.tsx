import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { typeOfTestsAndDescriptionData } from "@/lib/data"; // Adjust path if needed
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NoTestFoundError = () => {
    // Filter for available, free tests to recommend, and take the first 6.
    const recommendedTests = typeOfTestsAndDescriptionData
        .filter(test => test.isAvailableTo.length > 0 && test.accessLevel === 'FREE')
        .slice(0, 6);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]  p-4 text-center">
            <Card className="w-full max-w-3xl shadow-lg animate-fade-in">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">No Performance Data Found</CardTitle>
                    <CardDescription className="mt-2 text-lg text-gray-600">
                        Complete a test to start tracking your mistakes and improve your performance.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <h3 className="mb-6 text-xl font-semibold text-gray-700">Recommended Tests to Get Started</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendedTests.map((test) => {
                            const Icon = test.icon; // Assign component to a capitalized variable
                            return (
                                <Link href={test.href} key={test.title} legacyBehavior>
                                    <a className="group block rounded-lg border bg-white p-5 text-left transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="flex items-center mb-2">
                                            <Icon className="h-6 w-6 mr-3 text-purple-600" />
                                            <h4 className="text-lg font-semibold text-gray-800">{test.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">{test.description}</p>
                                        <div className="flex items-center text-purple-600 font-semibold text-sm">
                                            Start Test
                                            <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </a>
                                </Link>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoTestFoundError;