import { FEATURES } from '@/lib/data'
import React from 'react'

const Features = () => {
    return (
        <div className=" grid place-items-center px-4 md:px-10 lg:px-20 xl:px-32">
            <h1 className='text-4xl pt-14 pb-4 text-center font-semibold tracking-tight font-pt-serif'>
                Our Salient Features
            </h1>
            <p className='text-xl py-2 text-center font-normal max-w-3xl mx-auto'>
                We&apos;re dedicated to simplifying your journey with our comprehensive resources and support.
            </p>

            <div className="py-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-44 place-items-center">
                {FEATURES.map((elem, index) => (
                    <div  className=" w-[300px] mb-8 sm:mb-0" key={index}>
                        <div key={index} className="w-full items bg-accent3 dark:bg-dark-accent3 cursor-pointer shadow-md transition ease-in-out duration-500 hover:bg-second hover:scale-105 hover:shadow-2xl hover:border-black p-5 rounded-xl min-h-[10px] flex flex-col justify-center items-center text-center">
                            <div className="mb-5">
                                <img src={elem.image} alt={elem.title} className="h-20 w-20" loading='lazy' />
                            </div>
                            <h3 className="mb-2.5 text-xl font-bold">{elem.title}</h3>
                            <p className="text-sm font-light leading-normal max-w-[400px]">{elem.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features
