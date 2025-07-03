
import ErrorPage from '@/components/reusable/ErrorPage'
import { getCurrentChapterWiseTest, getDailySchedule, getLiveTests } from '@/lib/actions/tests.actions'
import React from 'react'
import LiveTestBox from './_components/LiveTestBox'
import DailySyllabusPage from './_components/DailySyllabusPage'

type Props = {}

export const metadata = {
    title: "Edulocus | Chapter-Wise Series",
    description: "Participate in live tests conducted by Edulocus"
}


const page = async (props: Props) => {

    const { data: dailySchedule, message: dailyScheduleMessage } = await getDailySchedule()
    if (!dailySchedule) {
        return <ErrorPage errorMessage="can't get test schedule!" />
    }

    const { data, message } = await getCurrentChapterWiseTest();
    console.log(data)
    if (!data) {
        return <div className='min-h-[70vh] flex flex-col items-center justify-center py-1 px-4 sm:px-6 lg:px-8'>
            <p className='text-xl font-semibold text-gray-800 mb-10'>No Test Available Right Now</p>
            <DailySyllabusPage schedule={dailySchedule} />
        </div>
    }


    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LiveTestBox
                key={data.id}
                id={data.id}
                archive={data.archive}
                name={data.name}
                createdBy={data.createdBy || 'Edulocus'} // Use 'createdBy' from fetched data
            />
            <DailySyllabusPage schedule={dailySchedule} />
        </div>
    )
}

export default page