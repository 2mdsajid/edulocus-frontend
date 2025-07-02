import { constructMetadata } from "@/lib/data"
import LiveTestsSchedule from "./_components/LiveTestsSchedule"

type Props = {}

export const metadata = constructMetadata({
  title: "Edulocus | Schedule",
  description: "View upcoming live test schedule of EduLocus"
})

const page = async (props: Props) => {

    return (
      <div className="w-full h-full">
        <LiveTestsSchedule />
      </div>
    )
}

export default page