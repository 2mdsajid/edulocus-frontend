
import ErrorPage from '@/components/reusable/ErrorPage'
import { parseAsString } from 'nuqs/server'
import { getAllTestsByType } from '../_components/actions'
import { TBaseCustomTest } from '../_components/schema'
import ChangeCategoryButton from './_components/ChangeCategoryButton'
import DisplayCustomTests from './_components/DisplayCustomTests'

type Props = {
  searchParams: {
    c: string
  }
}

const page = async (props: Props) => {


  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('PAST_PAPER')
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  const uniqueCategories = Array.from(
    new Set(customTestsData.map((test: TBaseCustomTest) => test.pastPaper?.category || null))
  ).filter((category) => category !== null);
  console.log("🚀 ~ page ~ uniqueCategories:", uniqueCategories)


  return (
    <div className="w-full">
      {(uniqueCategories.length > 0)
        && <ChangeCategoryButton categories={uniqueCategories} />}

      <DisplayCustomTests customTestsData={customTestsData} />
    </div>
  )
}

export default page