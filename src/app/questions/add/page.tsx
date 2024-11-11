import ErrorPage from '@/components/reusable/ErrorPage'
import { getUserSession } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'
import { getStreamsHierarchy, getSyllabus } from '../_components/actions'
import AddQuestionsForm from './_components/AddQuestionsForm'

type Props = {}

const page = async (props: Props) => {
  const { data: user, message: userAuthMessage } = await getUserSession()
  if (!user || !ROLES_HIEARCHY.MODERATOR.includes(user.role)) {
    return <ErrorPage errorMessage='You do not have permission to access this page' />
  }

  const { data: streamHirearchy, message: streamHirearchyMessage } = await getStreamsHierarchy()
  console.log("🚀 ~ page ~ streamHirearchy:", streamHirearchy)
  if (!streamHirearchy) {
    return <ErrorPage errorMessage={streamHirearchyMessage} />
  }

  const { data: syllabus, message: syllabusMessage } = await getSyllabus()
  if (!syllabus) {
    return <ErrorPage errorMessage={syllabusMessage} />
  }

  return (
    <div>
      <AddQuestionsForm
        syllabus={syllabus}
        streamHirearchy={streamHirearchy}
      />
    </div>
  )
}

export default page