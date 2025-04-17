import React from 'react'
import ScrollCounter from './ScrollCounter'

const CounterSection = () => {
    return (
        <section className="bg-color1 py-32 px-4 md:px-10 lg:px-20 xl:px-32">
            <div className='container mx-auto'>
                <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-gray-700 font-pt-serif'>
                    Empowering Students with MCQs
                </h2>
                <p className='text-xl text-center font-normal max-w-3xl mx-auto mb-12 text-gray-800'>
                    A platform designed to help you excel in your studies through comprehensive MCQ practice
                </p>
                <div className='flex justify-center flex-col md:space-x-7 md:flex-row'>
                    <ScrollCounter value={70000} title='Questions' />
                    <ScrollCounter value={45000} title='Solutions' />
                    <ScrollCounter value={20} title='Scholars' />
                </div>
            </div>
        </section>
    )
}

export default CounterSection
