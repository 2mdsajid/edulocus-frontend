import SignInLuciaGoogleButton from '@/components/reusable/SignInLuciaGoogleButton';
import { Card, CardContent } from "@/components/ui/card";
import { getUserSession } from '@/lib/auth/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components
import { Terminal, Lightbulb } from "lucide-react"; // Import an icon for the alert (e.g., Terminal or Lightbulb)

type Props = {
    searchParams:{
        ru:string
        error:string
    }
};

const LoginPage = async (props: Props) => {
    const { data: user, message } = await getUserSession();

    // Redirect authenticated users
    if (user && user.googleId && user.id) {
        redirect('/dashboard');
    }

    const authMessage = props.searchParams.error || ""

    return (
        // Overall page container with a subtle background and centered content
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center p-4 sm:p-8 py-12'>
            <Card className='w-full max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-xl'> {/* Enhanced shadow and rounded corners */}
                <div className='flex flex-col md:flex-row'>
                    {/* Image Section - Hidden on small screens, 1/2 width on medium screens and up */}
                    <div className='hidden md:block md:w-1/2 relative bg-purple-700 min-h-[300px] md:min-h-0'>
                        <Image
                            src='/thumbnail.jpg' // Ensure this path is correct and the image exists in your public directory
                            layout='fill'
                            objectFit='cover'
                            alt='Login background'
                            className="opacity-90 transition-opacity duration-300" // Slightly reduced opacity, added transition
                        />
                        {/* Optional: Add a subtle overlay for branding and text */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-800/60 to-purple-500/30 flex items-center justify-center p-8">
                            <div className="text-center text-white z-10">
                                <h2 className="text-3xl font-extrabold mb-2 drop-shadow-lg">Welcome Back!</h2>
                                <p className="text-lg opacity-90 drop-shadow-md">Your learning journey continues here.</p>
                            </div>
                        </div> */}
                    </div>

                    {/* Login Form/Content Section - Full width on small screens, 1/2 width on medium and up */}
                    <div className='w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center'> {/* Adjusted padding */}

                    {authMessage && (
                            <Alert variant="destructive" className="mb-6 shadow-sm"> {/* Using Shadcn Alert */}
                                <Terminal className="h-4 w-4" /> {/* Icon for the alert */}
                                <AlertTitle>Authentication Error</AlertTitle>
                                <AlertDescription>
                                    {authMessage}
                                </AlertDescription>
                            </Alert>
                        )}

                        <CardContent className='p-0'> {/* Remove default CardContent padding to control it manually */}
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center md:text-left">
                                Welcome to <span className="text-purple-600">EduLocus</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-700 mb-8 text-center md:text-left">
                                Your all-in-one platform for medical students and aspirants.
                                Join the community now and take your learning to the next level.
                            </p>
                            <div className="flex justify-center md:justify-start"> {/* Center button on small screens, left-align on md+ */}
                                <SignInLuciaGoogleButton ru={props.searchParams.ru} />
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;