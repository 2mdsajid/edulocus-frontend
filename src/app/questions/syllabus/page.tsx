import ErrorPage from '@/components/reusable/ErrorPage'
import { getSyllabus } from '../_components/actions'
import { RenderSyllabus } from './_components/RenderSyllabus'

type Props = {}

const page = async (props: Props) => {

  const { data: syllabus, message: syllabusMessage } = await getSyllabus()
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