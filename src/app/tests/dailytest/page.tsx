import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllTestsByType } from '@/lib/actions/tests.actions'
import React from 'react'
import TestList from './_components/TestsList'

type Props = {}

const page = async (props: Props) => {
    const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('DAILY_TEST')
    if (!customTestsData || customTestsData.length === 0) {
        return <ErrorPage errorMessage={customTestsDataMessage} />
    }

    const now = new Date();
    const hours = now.getHours();
    const todaysTest = customTestsData.find(test => new Date(test.date).toDateString() === new Date().toDateString());

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">Today&apos;s Test</h2>
            {hours >= 16 && hours < 20 && todaysTest ? (
                <TestList tests={[todaysTest]} />
            ) : (
                <div className="flex justify-center items-center h-[200px] w-full">
                    <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
                        <h2 className="text-xl font-bold mb-2 text-center">Today&apos;s Test Already Finished</h2>
                        <p className="text-sm text-gray-600 text-center">Tests are available from 4 PM to 8 PM every day.</p>
                    </div>
                </div>
            )}
            <h1 className="text-2xl font-bold mt-4">Previous Daily Tests</h1>
            <TestList tests={customTestsData} />
        </div>
    )
}

export default page