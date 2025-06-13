import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BookOpen, Clock, Lightbulb, MessageSquare, MonitorPlay, Users, Zap } from "lucide-react"; // Importing more icons for features
import Image from "next/image";
import Link from "next/link";
import React from 'react'; // Ensure React is imported

// You'll need to define bg1 and bg2 in your tailwind.config.js or use direct color values.
// For this example, I'll use shades of purple/indigo to match the theme.

// Define feature data for H.L.-Eduroom's offerings
const hlEduroomFeatures = [
    {
        icon: BookOpen,
        title: "NEB Courses",
        description: "Comprehensive coverage of Physics, Chemistry, Biology, and Mathematics for Grades 11 & 12.",
    },
    {
        icon: Lightbulb,
        title: "MBBS Entrance Preparation",
        description: "Special crash courses and practice materials based on the MECEE format.",
    },
    {
        icon: Zap, // Represents AI/smart
        title: "AI-Generated Mock Tests",
        description: "Smart tests modeled on past papers and the latest syllabus for optimal practice.",
    },
    {
        icon: MonitorPlay,
        title: "Live & Recorded Classes",
        description: "Learn at your pace with real-time interactive sessions or access recordings anytime, anywhere.",
    },
    {
        icon: Users,
        title: "Expert Tutors",
        description: "Learn from highly experienced and qualified instructors dedicated to your success.",
    },
    {
        icon: BookOpen, // Re-using for notes/practice sets
        title: "PDF Notes & Practice Sets",
        description: "Downloadable high-quality study materials and extensive practice sets for offline study.",
    },
    {
        icon: MessageSquare,
        title: "Doubt-Clearing Sessions",
        description: "Regular interactive Q&A sessions with instructors to clear all your confusions.",
    },
    {
        icon: Clock, // Represents progress tracking
        title: "Progress Tracking",
        description: "Monitor your performance through advanced online tools and analytics to identify strengths and weaknesses.",
    },
];

const page  = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 pt-5">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <div className="mb-8 relative w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                    <img
                        src="/hleduroom_cover.jpg"
                        alt="H.L.-Eduroom Cover"
                        className="object-cover w-full"
                    />
                </div>

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    A Powerful Collaboration: <br className="hidden sm:inline" />
                    <span className="text-purple-600">EduLocus</span> x <span className="text-indigo-600">H.L.-Eduroom</span>
                </h1>
                <p className="mx-auto mb-6 max-w-3xl text-xl text-gray-700">
                    We are thrilled to announce a strategic partnership aimed at providing you with unparalleled resources for MBBS Entrance (MECEE-CEE) preparation.
                </p>

                {/* <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 italic">
                    "Welcome to the official group of H.L.-Eduroom, your trusted platform for NEB and Medical Entrance (MECEE-CEE) preparation! You’re now part of the MedWarrior Batch – a 3-month crash course designed to help you crack MECEE-CEE 2081 with confidence! Let’s begin your journey to becoming a doctor!"
                </p> */}

                <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="https://docs.google.com/forms/d/19Fjqq6chi7geKPWTb9quvU3bMgyxHU2Kbgmdo6y74Vs/viewform" target="_blank" rel="noopener noreferrer">
                        Join the MedWarrior Batch Today <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </section>

            

            {/* About H.L.-Eduroom Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center bg-white rounded-xl shadow-md my-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    About H.L.-Eduroom
                </h2>
                <p className="mx-auto max-w-4xl text-lg text-gray-700 leading-relaxed">
                    H.L.-Eduroom is an innovative online learning platform based in Nepal that provides high-quality education and preparation materials for NEB (Grade 11 & 12) and MBBS entrance exams, especially MECEE. It is designed to support students with expert guidance, organized courses, and tech-driven learning experiences.
                </p>
            </section>

            

            {/* What H.L.-Eduroom Offers Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16">
                <h2 className="mb-10 text-3xl font-bold text-gray-900 text-center">
                    What H.L.-Eduroom Offers
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {hlEduroomFeatures.map((feature, index) => {
                        const { icon: FeatureIcon, title, description } = feature;
                        return (
                            <Card key={index} className="transition-all duration-300 hover:shadow-xl border border-gray-100 rounded-lg">
                                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                    <div className="flex-shrink-0 mb-0 inline-block rounded-full bg-purple-100 p-3 text-purple-600">
                                        <FeatureIcon className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600">{description}</CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            

            {/* Popular Programs Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center bg-white rounded-xl shadow-md my-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Our Popular Programs
                </h2>
                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    <Card className="transition-all duration-300 hover:shadow-xl border border-gray-100 rounded-lg p-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-indigo-700">MedWarrior Batch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg text-gray-700">
                                A 3 month crash course for MECEE entrance, packed with intensive mock tests, comprehensive notes, and targeted practice questions. Designed for cracking MECEE-CEE 2081 with confidence.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="transition-all duration-300 hover:shadow-xl border border-gray-100 rounded-lg p-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-indigo-700">RAW Batch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg text-gray-700">
                                A special intensive revision batch for entrance exams, with a sharp focus on rapid learning, strategic assessment, and maximizing retention.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            

            {/* Connect With Us Section */}
            <section className="bg-purple-700 py-8 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-3xl font-bold">Connect With H.L.-Eduroom</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
                        Have questions or need more information? Reach out to us through the following channels:
                    </p>
                    <div className="flex flex-wrap justify-center gap-1 text-xl">
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">WhatsApp:</span> +977 970-3869612
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">Email:</span>
                            <a href="mailto:hiteshsharma2080@icloud.com" className="underline hover:text-purple-200 transition-colors">hiteshsharma2080@icloud.com</a>
                        </p>
                        {/* <p className="flex items-center">
                            <span className="font-semibold mr-2">Website:</span>
                            <a href="https://hleduroom.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-200 transition-colors">hleduroom.com</a> (Coming Soon)
                        </p> */}
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">YouTube:</span>
                            <a href="https://www.youtube.com/@H.L.Eduroom" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-200 transition-colors">H.L.-Eduroom | Virus Sir</a>
                        </p>
                    </div>
                </div>
            </section>

            

            {/* Final Call to Action Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Ready to Start Your Journey?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
                    Join the H.L.-Eduroom MedWarrior Batch and unlock comprehensive resources, expert guidance, and a supportive community to help you achieve your academic goals!
                </p>
                <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="https://docs.google.com/forms/d/19Fjqq6chi7geKPWTb9quvU3bMgyxHU2Kbgmdo6y74Vs/viewform" target="_blank" rel="noopener noreferrer">
                        Enroll in MedWarrior Batch Now <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <p className="mt-8 text-sm text-gray-500">#HLEduroom #MedWarrior #MECEE2081 #FutureDoctors</p>
            </section>
        </div>
    );
};

export default page;