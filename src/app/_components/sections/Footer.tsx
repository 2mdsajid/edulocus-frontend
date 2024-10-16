import React from 'react';
import { HiOutlineMail } from 'react-icons/hi'
import { BsGlobe2 } from 'react-icons/bs'
import { FaFacebookF, FaMapMarkerAlt, FaTelegram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={`bg-gray-100 w-full  flex flex-col justify-center mx-auto pb-5`}>
            <div className={`flex flex-col md:flex-row md:justify-between my-5`}>
                <div className='w-[70%] mx-auto md:w-[30%]  flex-col gap-4 items-center md:items-start flex mb-10 md:mb-0'>
                    <h1 className='text-4xl font-bold'>EDULOCUS</h1>
                    {/* <p className='w-full py-5 text-lg'>Welcome to Medlocus, a platform designed to help students excel in their studies through comprehensive MCQ practice.</p>
                     */}
                    <div className='items-center md:items-start flex flex-col'>
                        <div className='flex gap-3'>
                            <Link href={'https://www.facebook.com/edulocus'} className='flex items-center gap-1 text-lg'>
                                <FaFacebookF />
                            </Link>
                            <Link href={'https://t.me/edulocus'} className='flex items-center gap-1 text-lg'>
                                <FaTelegram />
                            </Link>
                        </div>
                        <p>edulocus@gmail.com</p>
                    </div>
                </div>

                <div className='w-[70%] md:w-max mx-auto flex flex-col items-center md:items-start mb-10 md:mb-0'>
                    <h1 className='font-semibold text-2xl '>Know Us More</h1>
                    <Link className='hover:underline' href={'/codebase'} >Codebase</Link>
                </div>

                <div className='w-[70%] md:w-max mx-auto flex flex-col items-center md:items-start mb-10 md:mb-0'>
                    <h1 className='text-2xl font-semibold'>Useful Links</h1>
                    <Link className='hover:underline' href={'/contact'} >Contact</Link>
                    <Link className='hover:underline' href={'/contribute'} >Contribute</Link>
                </div>
                {/* <div className='w-[70%] md:w-max mx-auto flex flex-col items-center md:items-start mb-10 md:mb-0'>
                    <h1 className='text-2xl font-semibold'>Recommended</h1>
                    <Link target='_blank' className='hover:underline' href={'https://www.youtube.com/@MedLocusYT'} >Medlocus YT</Link>
                    <Link target='_blank' className='hover:underline' href={'https://entrancedose.com/'} >Entrance Dose</Link>
                    <Link target='_blank' className='hover:underline' href={'https://www.helpforentrance.com/'} >Help For Entrance</Link>
                    <p className='text-xs text-gray-400'>(Not sponsoring, they are good though! )</p>
                </div> */}
            </div>

            <div className="w-full h-full flex items-center justify-center 4">
                <h1 className="text-sm md:text-xl ">
                    &copy; 2024 Edulocus. All rights reserved.
                </h1>
            </div>
        </footer>
    )
}

export default Footer
