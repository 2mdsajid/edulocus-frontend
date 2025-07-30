
import ErrorPage from '@/components/reusable/ErrorPage'
import { constructMetadata } from '@/lib/data'
import ChapterwiseMainPage from './_components/ChapterwiseMainPage'
import { getTotalQuestionsPerSubjectAndChapter } from '@/lib/actions/questions.actions';

type Props = {}

export const metadata = constructMetadata({
  title: "Edulocus | Chapter Wise Tests",
  description: "Drill down into individual chapters of a se=pecific subject to strengthen your knowledge."
});


const page = async (props: Props) => {

  const {
    data: totalQuestionsPerSubjectAndChapterData,
    message: totalQuestionsPerSubjectAndChapterMessage
  } = await getTotalQuestionsPerSubjectAndChapter()
  if (!totalQuestionsPerSubjectAndChapterData) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectAndChapterMessage} />
  }


  return (
    <div className='w-full pt-4'>
      <ChapterwiseMainPage data={totalQuestionsPerSubjectAndChapterData} />
    </div>
  )
}

export default page
