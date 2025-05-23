import React from 'react'
import ScrollCounter from './ScrollCounter'
import StreamSelectButton from '@/app/try/_components/StreamSelectButton'

const StreamSection = () => {
    return (
        <section className="bg-color1 py-16 px-4 md:px-10 lg:px-20 xl:px-32">
            <div className='container mx-auto'>
                <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-gray-700 font-pt-serif'>
                Start Your Journey Now
                </h2>
                <p className='text-xl text-center font-normal max-w-3xl mx-auto mb-12 text-gray-800'>
                    Choose Your Preferred Stream to Start 
                </p>
                <div className="flex flex-col gap-10 items-center bg-gradient-to-b from-color1 to-color1 bg-blur-lg ">
                    <div className=" grid grid-cols-1 md:grid-cols-2 justify-center gap-8 px-4">
                        <StreamSelectButton stream="ug" />
                        <StreamSelectButton stream="pg" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StreamSection
