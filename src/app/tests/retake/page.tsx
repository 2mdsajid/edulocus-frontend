// Location: app/tests/recent/page.tsx (or your desired route)

import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import { constructMetadata } from '@/lib/data';
import { getRecentTests } from '@/lib/actions/tests.actions';
import { RecentTestsClientPage } from './_components/RecentTestsClientPage';

export const metadata =  constructMetadata({
  title: `Edulocus | Recent Tests`,
  description: `Review your recent test history, check your scores, and retake tests to improve.`,
});

// This is the type for the data you will receive
export type TRecentTest = {
    id: string;
    name:string;
    date: string;
    totalQuestions: number;
    score: number;
}

const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/tests/recent');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/tests/recent');
  }
  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members Can View Test History' />
  }

  const {data:tests, message} = await getRecentTests()
  if(!tests || tests.length === 0){
    return <ErrorPage errorMessage= {message || 'No Recent Tests Found'} />
  }

  return (
    <div className="min-h-screen w-full p-4 pt-20 sm:p-6 md:p-8 bg-gradient-to-b from-color1 to-color1">
      <RecentTestsClientPage tests={tests} />
    </div>
  )
};

export default Page;
