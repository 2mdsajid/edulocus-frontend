import { constructMetadata } from "@/lib/data"
import LiveTestsSchedule from "./_components/LiveTestsSchedule"
import DailySyllabusPage from "../_components/DailySyllabusPage"
import { getDailySchedule } from "@/lib/actions/tests.actions"
import ErrorPage from "@/components/reusable/ErrorPage"

type Props = {}

export const metadata = constructMetadata({
  title: "Edulocus | Schedule",
  description: "View upcoming live test schedule of EduLocus"
})

const page = async (props: Props) => {

  const { data: dailySchedule, message: dailyScheduleMessage } = await getDailySchedule()
  if (!dailySchedule) {
      return <ErrorPage errorMessage="can't get test schedule!" />
  }

    return (
      <div className="w-full absolute right-0 top-0 min-h-screen flex justify-center items-center">
        {/* <LiveTestsSchedule /> */}
        <DailySyllabusPage schedule={dailySchedule} />
      </div>
    )
}

export default page