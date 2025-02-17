import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { constructMetadata, membershipFeatures } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
    title: 'EduLocus | Membership',
    description: 'EduLocus membership details for premium users to have extra features than normal users'
});

const page = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-bg1 to-bg2 pt-20">
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Unlock Your Full Potential with{" "}
                    <span className="text-purple-600">Membership</span>
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                    Take your learning experience to the next level with our Membership! Here&apos;s what you&apos;ll gain:
                </p>
                <Button asChild size="lg" className="rounded-full">
                    <Link href={'/membership/register'}>
                        Join Membership Today @299 / month <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </section>

            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Who We Are & Why Your Support Matters
                </h2>
                <p className="mx-auto  max-w-3xl text-lg text-gray-700">
                    We are a small team of medical students from different medical colleges in Nepal,
                    passionate about helping as many students as we can. Your membership not only enables us to keep updating content
                    and stay motivated but also helps us run this platform. In short, we&apos;re broke, and we need your support to
                    keep this platform alive. By getting a membership, you are directly helping us sustain and improve EduLocus!
                </p>
            </section>

            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">
                    What you get ?
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {membershipFeatures.map((feature, index) => {
                        const { FeatureIcon, title, description } = feature;
                        return (
                            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4 inline-block rounded-full bg-purple-100 p-3 text-purple-600">
                                        <FeatureIcon className="w-6 h-6 text-purple-600 dark:text-purple-300 mr-2" />
                                    </div>
                                    <CardTitle className="text-xl">{title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{description}</CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            <section className="bg-purple-700 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-3xl font-bold">Join Membership Today!</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg">
                        Equip yourself with the tools, resources, and insights that make a difference. Our
                        membership is designed to empower your learning journey with every advantage.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="rounded-full">
                        <Link href={'/membership/register'}>
                            Get Started Now @299 / month <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default page;
