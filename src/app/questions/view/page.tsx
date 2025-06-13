import ErrorPage from "@/components/reusable/ErrorPage";
import { getAllTestsCreatedByUser } from "@/lib/actions/tests.actions";
import { PencilLine } from 'lucide-react';


const Page = async () => {
    const { data: tests, message } = await getAllTestsCreatedByUser();

    if (!tests || tests.length === 0) {
        return <ErrorPage errorMessage={message || "No custom tests found."} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">Your Custom Tests</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tests.map((test) => (
                        <div
                            key={test.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 break-words">{test.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                                <span className="font-semibold">Creator:</span> {test.creator || 'Unknown'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                <span className="font-semibold">Created On:</span> {new Date(test.date).toLocaleDateString()}
                            </p>
                            <div className="flex justify-end mt-4">
                                <a
                                    href={`/questions/create/${test.id}`}
                                    className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out group"
                                >
                                    <PencilLine className="h-5 w-5 mr-2 group-hover:rotate-6 transition-transform duration-200" />
                                    Edit Test
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;