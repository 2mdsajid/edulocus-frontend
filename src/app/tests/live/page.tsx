import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllTestsByType, getLiveTests } from '@/lib/actions/tests.actions'
import React from 'react'
import LiveTestBox from './_components/LiveTestBox'
import NoLiveTestsPage from './_components/NoLiveTestError'

type Props = {}

export const metadata = {
  title: "Edulocus | Live Tests",
  description: "Participate in live tests conducted by Edulocus"
}


const page = async (props: Props) => {
    // await new Promise(resolve => setTimeout(resolve, 10000));
    const today = new Date();
    const currentHour = today.getHours(); // Get the current hour (0-23)

    // Define the live test time window
    // const startTime = 16; // 4 PM
    // const endTime = 20;   // 8 PM

    // Check if the current time is outside the live test window
    // if (currentHour < startTime || currentHour >= endTime) {
    //     return <NoLiveTestsPage />;
    // }

    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const { data: liveTests, message: liveTestsMessage } = await getLiveTests(formattedDate)

    if (!liveTests || liveTests.length === 0) {
      return <NoLiveTestsPage />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveTests.map((test) => (
                <LiveTestBox
                    key={test.id}
                    id={test.id}
                    archive={test.archive}
                    name={test.name}
                    createdBy={test.creator || 'Edulocus'}
                    date={new Date(test.date).toLocaleDateString()}
                />
            ))}
        </div>
    )
}

export default page