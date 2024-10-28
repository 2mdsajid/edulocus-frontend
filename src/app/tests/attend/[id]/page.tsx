import React from 'react'
import { getSingleTestById } from './_components/actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import TestDetails from './_components/TestDetails'
import TestQuestions from './_components/TestQuestions'
import { getUserSession } from '@/lib/auth/auth'
import { generateRandomName } from '@/lib/utils'

type Props = {
    params: {
        id: string
    },
    searchParams: {
        username: string
    }
}

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
        <div className='max-w-2xl mx-auto py-4'>
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