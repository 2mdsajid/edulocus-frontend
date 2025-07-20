import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    CheckCircle, ChevronRight, Star, Zap, Repeat, BarChart, BookOpen, 
    FileText, Wrench, Sliders, Shuffle, TrendingUp, RefreshCcw, 
    Cpu
} from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/data"; // Assuming this path is correct

export const metadata = constructMetadata({
    title: 'EduLocus | Membership',
    description: 'Unlock exclusive features, unlimited tests, and dedicated mentorship to supercharge your medical exam preparation with EduLocus Membership.'
});

const page = async () => {
    // --- Features are now defined directly in the component ---

    const freeFeatures = [
        { title: 'Daily Test', icon: Zap },
        { title: 'Past Papers', icon: Repeat },
        { title: 'Model Exams', icon: BarChart },
        { title: 'Subject Wise Tests', icon: BookOpen },
        { title: 'Chapter Wise Tests', icon: FileText },
        { title: 'Comprehensive Dashboard', icon: CheckCircle },
        { title: '24/7 Counseling & Mentorship Support', icon: CheckCircle },

    ];
    
    const premiumTestFeatures = [
        { title: 'Custom Test Creation', icon: Wrench },
        { title: 'Difficulty Based Tests', icon: Sliders },
        { title: 'Randomized Question Bank Tests', icon: Shuffle },
        { title: 'Personalized Performance Analyzer', icon: TrendingUp },
        { title: 'Revision Tests (Incorrect/Skipped)', icon: RefreshCcw },
        { title: 'Unlimited Test Retakes', icon: Repeat },
        { title: 'Removed Question Limits on All Tests', icon: CheckCircle },
        { title: 'Unlock All Past Papers', icon: CheckCircle },
        { title: 'AI Based Analysis', icon: Cpu },
        { title: 'Priority Support & Early Access to New Features', icon: CheckCircle },

    ];

 

    // Combine all premium features for easy rendering
    const allPremiumFeatures = premiumTestFeatures;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 pt-20">
            {/* ========= Hero Section ========= */}
            <section className="bg-gradient-to-br from-bg1 to-bg2 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Unlock Your Full Potential with{" "}
                        <span className="text-purple-600">Membership</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
                        Supercharge your medical prep with exclusive tools, unlimited practice, and dedicated support.
                    </p>
                    {/* --- CTA Buttons with Free Trial --- */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
                            <Link href={'/membership/register'}>
                                Become a Member <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 bg-white/20 backdrop-blur-sm">
                             <Link href={'/membership/trial'}>
                                Start Free Trial
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ========= For Students, By Students Section ========= */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        For Students, By Students
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-gray-700">
                        We&apos;re a passionate team of Nepali medical students building EduLocus to empower our peers. Your membership is more than just a purchase—it&apos;s a vital contribution that fuels our mission. It allows us to maintain the platform, add more high-quality resources, and grow a supportive community for all aspirants.
                    </p>
                </div>
            </section>
            
            {/* ========= Features Comparison Section ========= */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    The Ultimate Toolkit for Your Success
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:items-start">
                    {/* --- FREE Features --- */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>What&apos;s Included for Free</CardTitle>
                            <CardDescription>Get started. Enough for all.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {freeFeatures.map(feature => (
                                    <li key={feature.title} className="flex items-center">
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium text-gray-700">{feature.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* --- PREMIUM Features --- */}
                    <Card className="h-full border-2 border-purple-600 shadow-2xl shadow-purple-200/50">
                        <CardHeader>
                             <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl text-purple-700">Unlock with Membership</CardTitle>
                                    <CardDescription>Gain the ultimate competitive edge.</CardDescription>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                                    <Star className="h-7 w-7" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 font-semibold text-gray-800">Everything in Free, plus:</p>
                            <ul className="space-y-4">
                                {allPremiumFeatures.map(feature => (
                                    <li key={feature.title} className="flex items-center">
                                         <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium text-gray-700">{feature.title}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={'/membership/trial'}
                                className="mt-6 flex w-full items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                            >
                                Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* ========= Final CTA Section ========= */}
            <section className="bg-purple-700 py-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-4 text-3xl font-bold">Ready to Elevate Your Prep?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-200">
                        Equip yourself with the tools, resources, and insights that make a difference. Your journey to success starts now.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base font-semibold">
                        <Link href={'/membership/register'}>
                            Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default page;