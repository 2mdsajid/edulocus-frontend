import { getStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions';
import { typeOfTestsAndDescriptionData } from '@/lib/data';
import { TStream } from '@/lib/schema/users.schema';
import { redirect } from 'next/navigation';
import LiveTestCard from './_components/LiveTestCard';
import TestTypeCard from './_components/TestTypeCard';

export default async function Page() {

  // getting the stream from the cookie -- to render the ones needed
  const stream = await getStreamCookieForUnauthenticatedUser() 
  const upperCaseStream = stream?.toUpperCase() as TStream;
  if (!upperCaseStream) {
    redirect('/try');
  }

  
  // Separate the tests into available and upcoming based on isAvailable property
  const availableTests = typeOfTestsAndDescriptionData.filter(test => test.isAvailableTo.includes(upperCaseStream));
  const upcomingTests = typeOfTestsAndDescriptionData.filter(test => !test.isAvailableTo.includes(upperCaseStream));


  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        {/* Available Tests Section */}
        <div>
          {/* <h2 className="text-2xl font-bold tracking-wide text-color7 dark:text-green-100 mb-6">
            Available Tests
          </h2> */}
          {/* <div className="mb-5">
            <LiveTestCard />
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {availableTests.map(testType => (
              <TestTypeCard
                key={testType.type}
                card={testType}
                isAvailable={true}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Tests Section */}
        <div>
          <h2 className="flex flex-col gap-1 text-2xl font-bold tracking-wide text-black dark:text-gray-300 mb-4">
            Upcoming Tests <span className="text-sm text-gray-600">(Early access for members. <a href="/membership" className="underline">Learn more</a>)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTests.map(testType => (
              <TestTypeCard
                key={testType.type}
                card={testType}
                isAvailable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
