import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart3,
    BookOpen,
    Brain,
    Calendar,
    ChevronRight,
    Gauge,
    Rocket,
    Sparkles,
    Trophy,
} from "lucide-react"
import Link from "next/link"

const features = [
    {
        icon: <Gauge className="h-8 w-8" />,
        title: "Accessible Dashboard",
        description:
            "Get quick and easy access to all your insights and tools in one user-friendly dashboard, designed to make your journey smoother and more productive.",
    },
    {
        icon: <BarChart3 className="h-8 w-8" />,
        title: "Detailed Test Analysis",
        description:
            "Analyze each test in-depth with a breakdown of your performance, so you know exactly where you excel and where you can improve.",
    },
    {
        icon: <BookOpen className="h-8 w-8" />,
        title: "Unlimited Access to All Tests",
        description:
            "Practice without limits! Access an extensive library of tests that cover every topic and difficulty level to ensure you're fully prepapurple.",
    },
    {
        icon: <Rocket className="h-8 w-8" />,
        title: "Early Access to New Features",
        description:
            "Be the first to try out our latest features! Premium members get priority access to tools and updates designed to give you a competitive edge.",
    },
    {
        icon: <Trophy className="h-8 w-8" />,
        title: "Exclusive Content from Top Achievers",
        description:
            "Gain insights directly from top scorers! Access unique study guides, tips, and techniques from those who've been at the top.",
    },
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "AI-Based Test & Topic Recommendations",
        description:
            "Let our AI guide you! Receive personalized recommendations for tests, chapters, and topics to focus on, based on your unique learning profile.",
    },
    {
        icon: <Brain className="h-8 w-8" />,
        title: "Intelligent Analysis",
        description:
            "Our AI-driven insights help you understand your strengths and weaknesses on a deeper level, making it easier to target your improvement areas.",
    },
    {
        icon: <Calendar className="h-8 w-8" />,
        title: "All Past Year Questions",
        description:
            "Prepare with confidence by accessing all past questions, helping you understand patterns and trends in the exams and tests.",
    },
]

const page = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-bg1 to-bg2 pt-20 ">
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Unlock Your Full Potential with{" "}
                    <span className="text-purple-600">Membership</span>
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                    Take your learning experience to the next level with our Membership! Here&apos;s what you&apos;ll
                    gain:
                </p>
                <Button asChild size="lg" className="rounded-full">
                    <Link href={'/subscription'}>
                        Join Membership Today @299 / month <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </section>

            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 py-16">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                            <CardHeader>
                                <div className="mb-4 inline-block rounded-full bg-purple-100 p-3 text-purple-600">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
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
                        <Link href={'/subscription'}>
                            Get Started Now @299 / month <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default page