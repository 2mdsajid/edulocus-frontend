import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BiLogoTelegram, BiSolidLogInCircle } from "react-icons/bi";

type Props = {}

const LandingPage = (props: Props) => {
    return (
        <div className="min-h-[100vh] bg-gradient-to-b from-color1 to-color1  bg-blur-lg gap-5 flex flex-col lg:flex-row items-start lg:items-start justify-start pt-32 pb-16 md:pt-40 px-4 md:px-10 lg:px-20 xl:px-32">
            {/* Text section */}
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 space-y-12">
                <span className="block font-bold tracking-wider -mb-10 text-left">CEE Based Entrance Exams</span>
                <h1 className="mb-6 text-4xl text-left font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Welcome To{" "}
                    <span className="text-color7">EduLocus</span>
                </h1>
                {/* <h1 className="text-5xl font-bold text-gray-900 text-left">Welcome to Edulocus</h1> */}
                <p className="text-xl text-gray-800 text-left leading-7">
                    Edulocus is your one-stop platform for comprehensive online learning and assessments.
                    We offer interactive, engaging tests and tailored resources to help you succeed in your
                    academic journey.
                </p>
            </div>

            {/* Image section */}
            <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <Image
                    src="/landingpagepic.png" // Replace with your image path
                    alt="Edulocus"
                    width={800}
                    height={400} // 1:1 aspect ratio
                    className="object-cover"
                />
            </div>

            {/* Button section for small devices */}
            <div className="lg:w-1/2 w-full flex flex-col lg:flex-row justify-center lg:justify-start gap-4 lg:absolute lg:top-[75vh] xl:top-[65vh] left-4 md:left-10 lg:left-20 xl:left-32">
                <Button asChild className="w-full lg:w-fit text-xl lg:text-2xl px-[2rem] py-[1.75rem] flex gap-2 bg-accent dark:bg-accent hover:bg-dark-accent dark:hover:bg-dark-accent dark:text-white font-semibold tracking-wider transition ease-in-out duration-500 hover:scale-105 hover:shadow-2xl">
                    <Link href={'/tests'} className="w-full">
                        Quick Test
                        <span className="">
                            <BiLogoTelegram />
                        </span>
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={'outline'}
                    className="w-full lg:w-fit text-xl lg:text-2xl px-[2rem] py-[1.75rem] flex gap-2 font-semibold tracking-wider border border-accent dark:border-white bg-white dark:bg-accent text-accent dark:text-white shadow-lg transition ease-in-out duration-500 hover:scale-105 hover:shadow-2xl hover:bg-accent hover:text-white dark:hover:bg-white dark:hover:text-accent"
                >
                    <Link href={'/membership'} className="w-full">
                        Explore Membership
                        <span className="my-5">
                            <BiSolidLogInCircle />
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default LandingPage;
