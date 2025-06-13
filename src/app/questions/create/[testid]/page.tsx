import { getSingleTestById } from '@/lib/actions/tests.actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import React from 'react'
import TestManagementPage from './_components/TestManagementPage'
import { getSubjects } from '@/lib/actions/questions.actions'

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

    const {data:subjects, message} =await getSubjects(test.stream);
    if(!subjects || subjects.length == 0){
        return <ErrorPage errorMessage={message || 'No Subjects Found'} />
    }



    // console.log(uniqueSubjects) 
    // console.log(test.questions).


    return (
        <div>
            <TestManagementPage test={test} subjects={subjects} />
        </div>
    )
}

export default page