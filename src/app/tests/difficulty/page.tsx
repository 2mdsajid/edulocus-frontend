import ErrorPage from '@/components/reusable/ErrorPage';
import { getTotalQuestionsPerSubject } from '@/lib/actions/questions.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data';
import { redirect } from 'next/navigation';
import { DifficultyTestForm } from './_components/DifficultyTestForm';

export const metadata = constructMetadata({
  title: "Edulocus | Difficulty Based Tests",
  description: "Challenge yourself with tests based on varying difficulty levels."
});


const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user) {
    redirect('/login?ru=/tests/difficulty');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/tests/difficulty');
  }
  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members Can Create a Difficulty Based Test' />;
  }

  const {
    data: totalQuestionsPerSubjectData,
    message: totalQuestionsPerSubjectMessage
  } = await getTotalQuestionsPerSubject()

  if (!totalQuestionsPerSubjectData || totalQuestionsPerSubjectData.length === 0) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectMessage || "No subjects found to create a test."} />
  }

  // Pass the fetched data to the client component
  return (
    <div className="flex  w-full items-center justify-center bg-gradient-to-b from-color1 to-color1 p-4">
      <DifficultyTestForm subjectsData={totalQuestionsPerSubjectData} />
    </div>
  );
};

export default Page;
