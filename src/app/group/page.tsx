import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GROUP_FEATURES } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const page = async () => { 
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-purple-50 ">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-8 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Collaborate and Conquer with{" "}
                    <span className="text-purple-600">EduLocus Groups</span>
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                    Empower your team or class with dedicated workspaces, streamlined progress tracking, and custom assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href={'/group/create'}>
                            Create Your Group <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href={'/group/view'}>
                            View your Groups <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Separator for visual break */}
            <Separator className="my-8" />

            {/* Features Section */}
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16">
                <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
                    What You Can Achieve with Groups
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"> {/* Adjusted grid for 2 columns */}
                    {GROUP_FEATURES.map((feature, index) => {
                        const { Icon, title, description } = feature;
                        return (
                            <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <CardHeader>
                                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 p-3 text-purple-600">
                                        <Icon className="w-8 h-8" /> {/* Larger icon */}
                                    </div>
                                    <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-lg text-gray-700">{description}</CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Call to Action Section */}
            {/* <section className="bg-purple-700 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-3xl font-bold">Ready to Build Your Learning Community?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg">
                        Start organizing your users, monitoring their growth, and delivering targeted learning experiences with EduLocus Groups.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="rounded-full text-purple-700 hover:bg-white/90">
                        <Link href={'/group/create'}>
                            Get Started Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section> */}
        </div>
    );
};

export default page;