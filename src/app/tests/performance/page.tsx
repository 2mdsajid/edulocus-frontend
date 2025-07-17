// Location: app/dashboard/performance/page.tsx (or your desired route)

import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import { constructMetadata } from '@/lib/data';
import { getPerformanceAnalyzerTest } from '@/lib/actions/tests.actions'; // Assuming the function is in this file
import { PerformanceAnalyzerClientPage } from './_components/OverallPerformanceCard';


export const metadata: Metadata = constructMetadata({
  title: `Edulocus | Performance Analyzer`,
  description: `An in-depth analysis of your test performance, highlighting strengths and weaknesses across subjects and chapters.`,
});

const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/dashboard/performance');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/dashboard/performance');
  }

  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members Can Create a Difficulty Based Test' />;
  }

  // Fetch the complete analytics data
  const {data:analyticData, message} = await getPerformanceAnalyzerTest();
  // console.log(analyticData)
  if (!analyticData) {
    return <ErrorPage errorMessage={'No performance data found. Please complete a test to see your analysis.'} />;
  }

  return (
    <div className="w-full bg-gradient-to-b from-color1 to-color1">
      <PerformanceAnalyzerClientPage data={analyticData} />
    </div>
  );
};

export default Page;
