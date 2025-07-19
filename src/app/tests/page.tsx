import { getUserSession } from '@/lib/auth/auth';
import { getStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions';
import { typeOfTestsAndDescriptionData } from '@/lib/data';
import { redirect } from 'next/navigation';
import LiveTestCard from './_components/LiveTestCard';
import TestTypeCard from './_components/TestTypeCard';
import { TStream } from '@/lib/schema/users.schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default async function Page() {
  // 1. Determine user and stream
  const { data: user } = await getUserSession();
  let stream: TStream | null = null;

  if (user) {
    stream = user.stream as TStream;
  } else {
    const streamFromCookie = await getStreamCookieForUnauthenticatedUser();
    stream = streamFromCookie ? (streamFromCookie.toUpperCase() as TStream) : null;
  }

  // If no stream is found, redirect
  if (!stream) {
    redirect('/try');
  }

  const isSubscribed = user?.isSubscribed ?? false;

  // Filter for tests available to the user's stream and that are not upcoming
  const streamAvailableTests = typeOfTestsAndDescriptionData.filter(
    (test) => test.isAvailableTo.includes(stream!)
  );

  // Separate tests into Free and Premium categories
  const freeTests = streamAvailableTests.filter(
    (test) => test.accessLevel === 'FREE'
  );
  const premiumTests = streamAvailableTests.filter(
    (test) => test.accessLevel === 'PREMIUM'
  );

  return (
    <div className="w-full  py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Live Test Card remains at the top */}
        <div className="mb-8">
          <LiveTestCard />
        </div>

        {/* Free Tests Section */}
        <div>
          {/* <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Free Tests
          </h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {freeTests.map((testType) => (
              <TestTypeCard
                key={testType.type}
                card={testType}
                isAvailable={true}
                isLocked={false} // Free tests are never locked
              />
            ))}
          </div>
        </div>

        {/* Premium Tests Section */}
        {premiumTests.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              {!isSubscribed && (
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Premium Tests
                  </h2>
                  <p className="mt-1 text-lg text-purple-600 dark:text-purple-400 font-semibold">
                    For Members Only
                  </p>
                </div>
              )}
              {!isSubscribed && (
                <Button asChild className="mt-4 sm:mt-0 group">
                  <Link href="/membership">
                    Upgrade to Membership <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {premiumTests.map((testType) => (
                <TestTypeCard
                  key={testType.type}
                  card={testType}
                  isAvailable={true}
                  // Lock premium tests if the user is not subscribed
                  isLocked={!isSubscribed} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}