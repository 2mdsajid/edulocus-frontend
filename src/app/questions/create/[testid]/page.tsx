import ErrorPage from '@/components/reusable/ErrorPage'
import { getSyllabus } from '@/lib/actions/questions.actions'
import { getSingleTestByIdForEdit } from '@/lib/actions/tests.actions'
import TestManagementPage from './_components/TestManagementPage'

type Props = {
    params: {
        testid: string
    }
}

const page = async (props: Props) => {
    try {
        const { data: test, message: testMessage } = await getSingleTestByIdForEdit(props.params.testid)
    
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
    } catch (error: any) {
        console.error("Error in page:", error);
        return <ErrorPage errorMessage={error.message || 'An unexpected error occurred'} />;
    }
}

export default page