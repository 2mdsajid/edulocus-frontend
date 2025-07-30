
import ErrorPage from '@/components/reusable/ErrorPage'
import { constructMetadata } from '@/lib/data'
import { getTotalQuestionsPerSubject } from '@/lib/actions/questions.actions'
import SubjectsList from './_components/SubjectsList'

type Props = {}

export const metadata = constructMetadata({
  title: "Edulocus | Subject Wise Tests",
  description: "Master specific subjects with our targeted practice tests."
});


const page = async (props: Props) => {

  const {
    data: totalQuestionsPerSubjectData,
    message: totalQuestionsPerSubjectMessage
  } = await getTotalQuestionsPerSubject()

  if (!totalQuestionsPerSubjectData || totalQuestionsPerSubjectData.length === 0) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectMessage} />
  }

  return (
    <div className='w-full '>
      <SubjectsList data={totalQuestionsPerSubjectData} />
    </div>
  )
}

export default page
