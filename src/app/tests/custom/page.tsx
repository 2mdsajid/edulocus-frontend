import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import { getTotalQuestionsPerSubjectAndChapter } from '@/lib/actions/questions.actions';
import { CustomTestForm } from './_components/CustomTestForm';
import { constructMetadata } from '@/lib/data';

export const metadata = constructMetadata({
  title: "Edulocus | Custom Test",
  description: "Design your own tests to perfectly match your study needs."
});



const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/tests/custom');
  }
  if (!user.isCompleted) {
    redirect('/login/stream?ru=/tests/custom');
  }
  if (!user.isSubscribed) {
    return <ErrorPage errorMessage='Only Members Can Create a Custom Test' />;
  }

  const {
    data: totalQuestionsPerSubjectAndChapterData,
    message: totalQuestionsPerSubjectAndChapterMessage
  } = await getTotalQuestionsPerSubjectAndChapter();

  if (!totalQuestionsPerSubjectAndChapterData) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectAndChapterMessage || 'Could not load test creation data.'} />;
  }

  return (
    <CustomTestForm allQuestionsData={totalQuestionsPerSubjectAndChapterData} />
  );
};

export default Page;
