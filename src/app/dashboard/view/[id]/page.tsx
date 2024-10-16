import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const page = (props: Props) => {

    const { id: testId } = props.params
    return (
        <div className='pt-16 pb-16 md:pt-40 px-4 md:px-10 lg:px-20 xl:px-32'>{testId}</div>
    )
}

export default page