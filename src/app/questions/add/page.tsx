import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'
import { getStreamsHierarchy, getSyllabus } from '@/lib/actions/questions.actions'
import AddQuestionsForm from './_components/AddQuestionsForm'
import { TStream } from '@/lib/schema/users.schema'
import { getAllStreams } from '@/lib/methods/questions.methods'

type Props = {
  searchParams: {
    stream: TStream
  }
}

const page = async (props: Props) => {
  const { data: user, message: userAuthMessage } = await getUserSession()

  if (!user || !ROLES_HIEARCHY.MODERATOR.includes(user.role)) {
    return <ErrorPage errorMessage='You do not have permission to access this page' />
  }

  const { data: streamHirearchy, message: streamHirearchyMessage } = await getStreamsHierarchy()
  if (!streamHirearchy) {
    return <ErrorPage errorMessage={streamHirearchyMessage} />
  }

  const stream = props.searchParams.stream.toUpperCase() as TStream
  if (!stream || !getAllStreams(streamHirearchy).includes(stream)) {
    return <ErrorPage errorMessage='Invalid Stream Parameter' />
  }

  const { data: syllabus, message: syllabusMessage } = await getSyllabus(stream)
  if (!syllabus) {
    return <ErrorPage errorMessage={syllabusMessage} />
  }

  return (
    <div>
      <AddQuestionsForm
        stream={stream}
        syllabus={syllabus}
        streamHirearchy={streamHirearchy}
      />
    </div>
  )
}

export default page