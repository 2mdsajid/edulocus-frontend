import React from 'react'
import { getSingleTestById } from './_components/actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import TestDetails from './_components/TestDetails'
import TestQuestions from './_components/TestQuestions'
import { getUserSession } from '@/lib/auth/auth'
import { generateRandomName } from '@/lib/utils'
import { constructMetadata } from '@/lib/data'
import { Metadata } from 'next'

type Props = {
    params: {
        id: string
    },
    searchParams: {
        username: string
    }
}


export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { data: testData, message } = await getSingleTestById(props.params.id)
    if (!testData) {
        return constructMetadata({
            title: `EduLocus | Test`,
            description: `Test from EduLocus .`
        });
    }
    return constructMetadata({
        title: `Edulocus | Test`,
        description: `${testData.slug} created by ${testData.createdBy} for a comprehensive learning experience.`,
    });
};


const page = async (props: Props) => {

    const { data: user, message: userAuthMessage } = await getUserSession()

    const testid = props.params.id
    const { data: test, message } = await getSingleTestById(testid)
    if (!test) {
        return <ErrorPage errorMessage={message} />
    }

    const { username } = props.searchParams || generateRandomName()
    const testUrl = `${process.env.NEXT_PUBLIC_BASEURL}/tests/${testid}`

    return (
        <div className='max-w-3xl mx-auto py-4 bg-color1'>
            <TestDetails
                id={test.id}
                questionsCount={test.questions.length.toString()}
                testName={test.name}
                slug={test.slug}
                username={username}
                createdBy={test.createdBy}
            />
            <TestQuestions
                id={test.id}
                testName={test.name}
                questions={test.fetchedQuestions}
                userid={user?.id as string}
                username={username}
                sharableTestUrl={testUrl}
                user={user}
            />
        </div>
    )
}

export default page