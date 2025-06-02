import ErrorPage from '@/components/reusable/ErrorPage'
import { getSingleTestById, getTestBasicScores } from '@/lib/actions/tests.actions'
import { getUserSession } from '@/lib/auth/auth'
import { constructMetadata } from '@/lib/data'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import ReTestMain from './_components/ReTestMain'
import { isUserSajid, isUserSubscribed } from '@/lib/utils'



type Props = {
    params: {
        id: string
    },
}


export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { data: testData, message } = await getSingleTestById(props.params.id)
    if (!testData) {
        return constructMetadata({
            title: `EduLocus | Retake`,
            description: `Retake the test from EduLocus .`
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

    if (!user || (!isUserSubscribed(user) && !isUserSajid(user))) {
        return <ErrorPage errorMessage='Only Subscribed Members or Authorized Users Can Re-Take This Test.' />;
    }


    const testid = props.params.id
    const { data: test, message } = await getSingleTestById(testid)
    if (!test) {
        return <ErrorPage errorMessage={message} />
    }

    const { data: previousScore, message: scoreMessage } = await getTestBasicScores(testid)
    if (!previousScore) {
        return <ErrorPage errorMessage='Please attent the test first' />
    }

    return (
        <div className='max-w-3xl mx-auto py-4 bg-color1'>
            <ReTestMain
                id={test.id}
                testName={test.name}
                questions={test.questions}
                userid={user?.id as string}
                user={user}
                previousScore={previousScore}
                authToken={authToken}
            />
        </div>
    )
}

export default page