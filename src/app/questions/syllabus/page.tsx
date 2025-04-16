import ErrorPage from '@/components/reusable/ErrorPage'
import { RenderSyllabus } from './_components/RenderSyllabus'
import { getSyllabus } from '@/lib/actions/questions.actions'

type Props = {}

const page = async (props: Props) => {

  const { data: syllabus, message: syllabusMessage } = await getSyllabus("PG")
  if (!syllabus) {
    return <ErrorPage errorMessage={syllabusMessage} />
  }

  return (
    <div>
        <RenderSyllabus syllabus={syllabus} />
    </div>
  )
}

export default page