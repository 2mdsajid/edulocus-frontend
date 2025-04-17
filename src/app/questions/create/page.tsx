import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'
import CreateCustomTestForm from './_components/CreateTestForm'
import { getStreamsHierarchy } from '@/lib/actions/questions.actions'
import { getAllStreams } from '@/lib/methods/questions.methods'

type Props = {}

const page = async (props: Props) => {

      const { data: streamHirearchy, message: streamHirearchyMessage } = await getStreamsHierarchy()
      if (!streamHirearchy) {
        return <ErrorPage errorMessage={streamHirearchyMessage} />
      }

      const streams = getAllStreams(streamHirearchy)

    return (
        <div className="">
            <h1 className="text-2xl font-bold">Create Custom Test</h1>
            <CreateCustomTestForm streams={streams} />
        </div>
    )
}

export default page