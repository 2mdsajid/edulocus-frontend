import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { constructMetadata } from "@/lib/data"; // Assuming you have this helper
import { ChevronRight, BookOpen, PenSquare, Users, Calculator, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

// Feature data for Note Library's offerings
const noteLibraryFeatures = [
    {
        icon: BookOpen,
        title: "Comprehensive Notes",
        description: "Access detailed, well-structured notes for a wide range of subjects and courses, all in one place.",
    },
    {
        icon: PenSquare,
        title: "Extensive Test Series",
        description: "Prepare for your exams with our vast collection of practice tests and mock exams designed to mirror the real thing.",
    },
    {
        icon: Users,
        title: "Student Community",
        description: "Join a vibrant community of learners. Ask questions, share knowledge, and collaborate with peers.",
    },
    {
        icon: Calculator,
        title: "NEB Grade Calculator",
        description: "Easily calculate your NEB grades and GPA with our simple and accurate online calculator tool.",
    },
    {
        icon: Zap,
        title: "Curated Resources",
        description: "Find a wealth of extra resources, including past papers, syllabi, and expert-curated study materials.",
    },
    {
        icon: MessageSquare,
        title: "Q&A Forum",
        description: "Get your doubts cleared quickly by posting questions in our community forum, answered by peers and experts.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Content",
        description: "Study with confidence knowing our notes and resources are created and verified by subject matter experts.",
    },
];

export const metadata = constructMetadata({
    title: 'Note Library | Your Ultimate Study Partner',
    description: 'Note Library offers comprehensive notes, extensive test series, a vibrant student community, and essential tools like the NEB Calculator to help you succeed.'
});

const Page = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 pt-5">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <div className="mb-8 relative w-full  rounded-xl overflow-hidden  flex items-center justify-center">
                    {/* Replace with your desired cover image */}
                    <img
                        src="/notelibrary_cover.png"
                        alt="Note Library Cover"
                        className="object-cover w-full md:w-1/2 xl:w-1/3"
                    />
                </div>

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Unlock Your Potential with <br className="hidden sm:inline" />
                    <span className="text-purple-600">Note Library</span>
                </h1>
                <p className="mx-auto mb-6 max-w-3xl text-xl text-gray-700">
                    Your ultimate academic partner for comprehensive notes, test series, and a supportive student community.
                </p>

                <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="https://notelibraryapp.com/" target="_blank" rel="noopener noreferrer">
                        Explore Resources <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </section>

            {/* About Note Library Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center bg-white rounded-xl shadow-md my-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    About Note Library
                </h2>
                <p className="mx-auto max-w-4xl text-lg text-gray-700 leading-relaxed">
                    Note Library is a premier online platform dedicated to providing students with high-quality study materials and academic resources. We aim to make learning more accessible, efficient, and collaborative by offering everything a student needs—from detailed notes and practice tests to a space for peer support.
                </p>
            </section>

            {/* What Note Library Offers Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16">
                <h2 className="mb-10 text-3xl font-bold text-gray-900 text-center">
                    What Note Library Offers
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {noteLibraryFeatures.map((feature, index) => {
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

            {/* Connect With Us Section */}
            <section className="bg-purple-700 py-12 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
                        Become part of a growing network of students. Ask questions, share your insights, and learn together.
                    </p>
                    <div className="flex justify-center gap-4">
                         <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-purple-700 transition-all duration-300">
                            <Link href="https://notelibraryapp.com/" target="_blank" rel="noopener noreferrer">
                                Visit the Forum
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Final Call to Action Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Ready to Ace Your Exams?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
                    Dive into our extensive library of notes and start practicing with our test series today. Your journey to academic excellence starts here!
                </p>
                <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="https://notelibraryapp.com/" target="_blank" rel="noopener noreferrer">
                        Start Learning Now <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <p className="mt-8 text-sm text-gray-500">#NoteLibrary #StudentSuccess #NEB #StudyNotes</p>
            </section>
        </div>
    );
};

export default Page;