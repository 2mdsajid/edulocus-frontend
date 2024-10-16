import React from 'react'
import ScrollCounter from './ScrollCounter'

const CounterSection = () => {
    return (
            <div className={`w-full flex items-center justify-center py-20`}>
                <div>
                    <h1 className='text-4xl pt-14 pb-4 text-center font-semibold tracking-tight font-pt-serif'>
                        Empowering Students with MCQ 
                    </h1>
                    <p className='text-xl py-2 text-center font-normal max-w-3xl mx-auto'>
                        A platform designed to help you excel in your studies through comprehensive MCQ practice
                    </p>
                    <div className='flex justify-center flex-col md:space-x-7 md:flex-row'>
                        <ScrollCounter value={70000} title='Questions' />
                        <ScrollCounter value={40000} title='Solutions' />
                        <ScrollCounter value={20} title='Scholars' />
                    </div>
                </div>
            </div>
    )
}

export default CounterSection
