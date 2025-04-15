import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { constructMetadata } from '@/lib/data'
import { generateRandomName } from '@/lib/utils'
import { Metadata } from 'next'
import TestDetails from './_components/TestDetails'
import TestMain from './_components/TestMain'
import { getSingleTestById } from '@/lib/actions/tests.actions'
import { cookies } from 'next/headers'



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

    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth-token')?.value

    const { data: user, message: userAuthMessage } = await getUserSession()


    const testid = props.params.id
    const { data: test, message } = await getSingleTestById(testid)
    if (!test) {
        return <ErrorPage errorMessage={message} />
    }

    const { username } = props.searchParams || generateRandomName()
    const testUrl = `${process.env.NEXT_PUBLIC_BASEURL}/tests/view/${testid}`

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
            <TestMain
                id={test.id}
                testName={test.name}
                questions={test.fetchedQuestions}
                userid={user?.id as string}
                username={username}
                sharableTestUrl={testUrl}
                user={user}
                authToken={authToken}
            />
        </div>
    )
}

export default page