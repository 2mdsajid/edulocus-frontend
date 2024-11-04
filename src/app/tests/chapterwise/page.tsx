
import ErrorPage from '@/components/reusable/ErrorPage'
import { constructMetadata } from '@/lib/data'
import { getTotalQuestionsPerSubjectAndChapter } from './_components/actions'
import ChapterwiseMainPage from './_components/ChapterwiseMainPage'

type Props = {}

export const metadata =  constructMetadata({
  title: `Edulocus | Chapterwise Test`,
  description: `Chapterwise test created from EduLocus for a comprehensive learning experience.`,
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
