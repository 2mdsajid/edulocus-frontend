import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'
import CreateCustomTestForm from './_components/CreateTestForm'

type Props = {}

const page = async (props: Props) => {
    const { data: user, message: userAuthMessage } = await getUserSession()

    if (!user || !ROLES_HIEARCHY.MODERATOR.includes(user.role)) {
        return <ErrorPage errorMessage='You do not have permission to access this page' />
    }

    //   const { data: streamHirearchy, message: streamHirearchyMessage } = await getStreamsHierarchy()
    //   if (!streamHirearchy) {
    //     return <ErrorPage errorMessage={streamHirearchyMessage} />
    //   }

    return (
        <div className="">
            <h1 className="text-2xl font-bold">Create Custom Test</h1>
            <CreateCustomTestForm />
        </div>
    )
}

export default page