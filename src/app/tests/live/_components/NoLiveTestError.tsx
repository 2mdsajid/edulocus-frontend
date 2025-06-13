import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const NoLiveTestsPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-3 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-center ">
          <AlertCircle className="h-12 w-12 text-red-500 animate-pulse-slow" />
        </div>

        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
          No Live Test Right Now!
        </h2>

        <p className="mt-4 text-md text-gray-700">
          Live tests available between
          <span className="font-bold text-indigo-600"> 4:00 PM - 8:00 PM </span>
        </p>
        {/* <p className="mt-2 text-md text-gray-600">
          It looks like you're outside this window, or there are no active tests scheduled for the moment.
        </p> */}

        <div className="mt-8 flex flex-col space-y-4 justify-center">
          <Link href="/tests/live/schedule" passHref>
            <button className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 active:scale-95 duration-200">
              View Test Schedule
            </button>
          </Link>
          <Link href="/tests" passHref>
            <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 active:scale-95 duration-200">
              Explore Other Tests
            </button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Check back during the live test window, or find other practice tests to hone your skills!
        </p>
      </div>
    </div>
  );
};

export default NoLiveTestsPage;