import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import RandomTestForm from './_components/RandomTestForm';
import ErrorPage from '@/components/reusable/ErrorPage';

export const metadata: Metadata = {
  title: 'Random Test | Your Platform Name',
  description: 'Start a new test with a random selection of questions. Customize the test length and challenge your knowledge.',
};


const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/tests/random');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/tests/random');
  }

  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members Can Attend This Test' />
  }

  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-b from-color1 to-color1  p-4 pt-20">
      <RandomTestForm />;
    </div>
  )
};

export default Page;
