import ErrorPage from '@/components/reusable/ErrorPage';
import { Button } from '@/components/ui/button';
import { getDashboardAnalytics } from '@/lib/actions/analytis.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardTabs } from './_components/DashboardTabs';
import { GenerateReportPDF } from './_components/GenerateReportPDF';

type Props = {};

export const metadata = constructMetadata({
    title: "Edulocus | Dashboard",
    description: "Dashboard by EduLocus"
})

const page = async (props: Props) => {

    const { data: user } = await getUserSession();
    if (!user?.id) {
        redirect('/login');
    }
    if (!user.isCompleted) {
        redirect('/login/stream');
    }

    const {
        data: dashboardAnalyticsData,
        message: dashboardAnalyticsMessage,
    } = await getDashboardAnalytics(user.id);

    if (!dashboardAnalyticsData) {
        return <ErrorPage errorMessage={dashboardAnalyticsMessage || "Could not load dashboard data."} />;
    }

    return (
        <div className='w-full bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto space-y-6 pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="mt-1 text-md text-gray-600">Welcome back! Here&apos;s a summary of your performance.</p>
                    </div>
                    <GenerateReportPDF analyticsData={dashboardAnalyticsData} />
                    {/* <Link href="/dashboard/ai">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Bot className="w-5 h-5" />
                            Generate AI Report
                        </Button>
                    </Link> */}
                </header>

                <main>
                    <DashboardTabs analyticsData={dashboardAnalyticsData} />
                </main>
            </div>
        </div>
    );


};

export default page;
