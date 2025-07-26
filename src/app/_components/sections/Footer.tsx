import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTelegram, FaViber, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={`bg-color8 text-white w-full  flex flex-col justify-center mx-auto pb-5`}>
            <div className={`flex flex-col md:flex-row md:justify-between my-5`}>
                <div className='w-[70%] mx-auto md:w-[30%]  flex-col gap-4 items-center md:items-start flex mb-10 md:mb-0'>
                    <h1 className='text-4xl font-bold'>EDULOCUS</h1>
                    {/* <p className='w-full py-5 text-lg'>Welcome to Medlocus, a platform designed to help students excel in their studies through comprehensive MCQ practice.</p>
                     */}
                    <div className='items-center md:items-start flex flex-col'>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 mb-2'>
    <Link target='_blank' referrerPolicy='no-referrer' href={'https://www.facebook.com/profile.php?id=61567770503553'} className='flex items-center text-xl text-gray-100 hover:text-blue-600 transition-colors'>
        <FaFacebookF />
        <span className="sr-only">Facebook</span>
    </Link>
    <Link target='_blank' referrerPolicy='no-referrer' href={'https://t.me/edulocus_tg'} className='flex items-center text-xl text-gray-100 hover:text-sky-500 transition-colors'>
        <FaTelegram />
        <span className="sr-only">Telegram</span>
    </Link>
    <Link target='_blank' referrerPolicy='no-referrer' href="https://www.instagram.com/edulocus/" className="flex items-center text-xl text-gray-100 hover:text-pink-600 transition-colors">
        <FaInstagram />
        <span className="sr-only">Instagram</span>
    </Link>
    {/* --- Updated WhatsApp Link with Visible Number --- */}
    <Link target='_blank' referrerPolicy='no-referrer' href="https://wa.me/9779763249052" className="flex items-center gap-2 text-gray-100 hover:text-green-600 transition-colors">
        <FaWhatsapp className="text-xl"/>
        <span className="text-sm font-medium sr-only">+977 9763249052</span>
    </Link>
    {/* <Link target='_blank' referrerPolicy='no-referrer' href="https://invite.viber.com/?g2=AQAR1VddClIhRlOy6Xmu3fiA8qWKNPCerYr1fVwVAJPdGlU1%2BgbgtWFTitvm5c1E" className="">
        <FaViber className="" />
        <span className="sr-only">Viber</span>
    </Link> 
    */}
</div>
                        <p>edulocusweb@gmail.com</p>
                    </div>
                </div>

                <div className='w-[70%] md:w-max mx-auto flex flex-col items-center md:items-start mb-10 md:mb-0'>
                    <h1 className='font-semibold text-2xl '>Know Us More</h1>
                    {/* <Link className='hover:underline' href={'/questions/syllabus'} >Syllabus</Link> */}
                    <Link className='hover:underline' href={'/faq'} >FAQ</Link>
                    <Link className='hover:underline' href={'/feedback'} >Contact</Link>
                </div>

                <div className='w-[70%] md:w-max mx-auto flex flex-col items-center md:items-start mb-10 md:mb-0'>
                    <h1 className='text-2xl font-semibold'>Useful Links</h1>
                    <Link className='hover:underline' href={'/group'} >Groups</Link>
                    <Link className='hover:underline' href={'/membership'} >Membership</Link>
                    {/* <Link className='hover:underline' href={'/try'} >Change Stream</Link> */}
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
