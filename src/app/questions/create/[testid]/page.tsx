import { getSingleTestById } from '@/lib/actions/tests.actions'
import ErrorPage from '@/components/reusable/ErrorPage'
import React from 'react'
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

    const subjects = test.questions.map(question => question.subject);
    const uniqueSubjects = Array.from(new Set(subjects));

    // console.log(uniqueSubjects)
    // console.log(test.questions).


    return (
        <div>
            <TestManagementPage test={test} subjects={uniqueSubjects} />
        </div>
    )
}

export default page