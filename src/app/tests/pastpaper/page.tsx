
import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllTestsByType } from '@/lib/actions/tests.actions'
import { TBaseCustomTest } from '@/lib/schema/tests.schema'
import ChangeCategoryButton from './_components/ChangeCategoryButton'
import DisplayCustomTests from './_components/DisplayCustomTests'
import { getUserSession } from '@/lib/auth/auth'
import { constructMetadata } from '@/lib/data'

export const metadata = constructMetadata({
  title: "Edulocus | Past Papers",
  description: "Hone your skills with a wide collection of previous exam papers."
});

type Props = {
  searchParams: {
    c: string
  }
}

const page = async (props: Props) => {

  const { data: user } = await getUserSession();
  const isUserSubscribed = user?.isSubscribed || false


  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('PAST_PAPER')
  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage} />
  }

  const uniqueCategories = Array.from(
    new Set(customTestsData.map((test: TBaseCustomTest) => test.pastPaper?.category || null))
  ).filter((category) => category !== null);

  return (
    <div className="w-full">
      {(uniqueCategories.length > 0)
        && <ChangeCategoryButton categories={uniqueCategories} />}

      <DisplayCustomTests customTestsData={customTestsData} isUserSubscribed={isUserSubscribed} />
    </div>
  )
}

export default page