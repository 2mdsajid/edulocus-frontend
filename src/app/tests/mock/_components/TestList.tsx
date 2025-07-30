import { TBaseCustomTest } from '@/lib/schema/tests.schema';
import Link from 'next/link';
import { TestCard } from './TestCard';

type Props = {
  tests: TBaseCustomTest[];
  isUserSubscribed: boolean;
};

export default function TestList({ tests, isUserSubscribed }: Props) {
  // For non-subscribed users, split tests into two lists
  const unlockedTests = tests.filter(test => !test.isAvailableToPremium);
  const lockedTests = tests.filter(test => test.isAvailableToPremium);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
      {/* --- RENDER LOGIC --- */}
      {isUserSubscribed ? (
        // 1. VIEW FOR SUBSCRIBED USERS
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            All Available Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tests.map(test => (
              <TestCard key={test.id} test={test} isLocked={false} />
            ))}
          </div>
        </section>
      ) : (
        // 2. VIEW FOR NON-SUBSCRIBED USERS
        <>
          {/* Unlocked Tests Section */}
          {unlockedTests.length > 0 && (
            <section>
              {/* <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                Free Tests
              </h2> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {unlockedTests.map(test => (
                  <TestCard key={test.id} test={test} isLocked={false} />
                ))}
              </div>
            </section>
          )}

          {/* Locked Tests Section */}
          {lockedTests.length > 0 && (
            <section>
              <div className="mb-6 rounded-lg  p-6 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Premium Tests
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  Unlock these {lockedTests.length} tests and more by becoming a member.
                </p>
                <Link href="/membership" className="mt-4 inline-block rounded-md bg-purple-600 px-5 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Upgrade Membership
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {lockedTests.map(test => (
                  <TestCard key={test.id} test={test} isLocked={true} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}