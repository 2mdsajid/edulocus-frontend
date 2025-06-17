import ErrorPage from '@/components/reusable/ErrorPage'
import { getSyllabus } from '@/lib/actions/questions.actions'
import { getSingleTestById } from '@/lib/actions/tests.actions'
import TestManagementPage from './_components/TestManagementPage'

type Props = {
    params: {
        testid: string
    }
}

const page = async (props: Props) => {
    const { data: test, message: testMessage } = await getSingleTestById(props.params.testid)
    if (!test) {
        return <ErrorPage errorMessage={testMessage} />
    }

    const {data:syllabus, message} =await getSyllabus(test.stream);
    if(!syllabus){
        return <ErrorPage errorMessage={message || 'No Syllabus Found'} />
    }



    // console.log(uniqueSubjects) 
    // console.log(test.questions).


    return (
        <div>
            <TestManagementPage test={test} syllabus={syllabus} />
        </div>
    )
}

export default page