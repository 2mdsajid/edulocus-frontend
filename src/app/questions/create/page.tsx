import ErrorPage from '@/components/reusable/ErrorPage'
import { getStreamsHierarchy } from '@/lib/actions/questions.actions'
import { getAllStreams } from '@/lib/methods/questions.methods'
import CreateCustomTestForm from './_components/CreateTestForm'

type Props = {
  searchParams: {
    gid: string
  }
}

const page = async (props: Props) => {

  const gid = props.searchParams.gid || null
  console.log("giddd",gid)

  const { data: streamHirearchy, message: streamHirearchyMessage } = await getStreamsHierarchy()
  if (!streamHirearchy) {
    return <ErrorPage errorMessage={streamHirearchyMessage} />
  }

  const streams = getAllStreams(streamHirearchy)

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Create Custom Test</h1>
      <CreateCustomTestForm 
      streams={streams} 
      gid={gid}
      />
    </div>
  )
}

export default page