// Location: app/dashboard/performance/page.tsx

import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import { constructMetadata } from '@/lib/data';
import { getRevisionQuestions } from '@/lib/actions/tests.actions'; 
import MistakeRevisionClient from './_components/MistakeRevisionClient';


export const metadata: Metadata = constructMetadata({
  title: `Edulocus | Mistakes Revision`,
  description: `An in-depth analysis of your mistake questions. Practice them to improve your efficiency.`,
});

const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/dashboard/performance');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/dashboard/performance');
  }

  // NOTE: I'm keeping your subscription check here.
  // If you want even non-subscribed users to see their mistakes but not practice,
  // you could pass `isSubscribed` as a prop to the client component and disable the practice button there.
  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members can practice their mistakes. Please subscribe to access this feature.' />;
  }

  const { data: mistakeQuestionsData, message } = await getRevisionQuestions();
  if (!mistakeQuestionsData || (mistakeQuestionsData.incorrectQuestions.length === 0 && mistakeQuestionsData.unattemptedQuestions.length === 0)) {
    return <ErrorPage errorMessage={message || 'No performance data found. Complete a test to see your analysis.'} />;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6 lg:p-8">
      <MistakeRevisionClient mistakeQuestionsData={mistakeQuestionsData} />
    </div>
  );
};

export default Page;
