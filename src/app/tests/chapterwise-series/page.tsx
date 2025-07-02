
import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllTestsByType, getLiveTests } from '@/lib/actions/tests.actions'
import React from 'react'
import LiveTestBox from './_components/LiveTestBox'
import NoLiveTestsPage from './_components/NoLiveTestError'
import Main from './_components/Main'

type Props = {}

export const metadata = {
  title: "Edulocus | Live Tests",
  description: "Participate in live tests conducted by Edulocus"
}


const page = async (props: Props) => {
    return (
        <div className="w-full">
            <Main  />
        </div>
    )
}

export default page