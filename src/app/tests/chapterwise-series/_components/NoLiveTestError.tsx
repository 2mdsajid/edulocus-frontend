import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ChapterWiseSyllabus } from '@/lib/chap_syllabus';

const NoLiveTestsPage: React.FC = () => {
  // Get today's date in "month_day" format (e.g., "july_3")
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' }).toLowerCase();
  const day = today.getDate();
  const todayStr = `${month}_${day}`;

  // Find today's schedule
  const todaysSchedule = ChapterWiseSyllabus.find(item => item.day === todayStr);

  return (
    <div className="min-h-[70vh] flex items-center justify-center  py-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-3 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-center ">
          <AlertCircle className="h-12 w-12 text-red-500 animate-pulse-slow" />
        </div>

        <h2 className="my-6 text-2xl font-extrabold text-gray-900">
          No Test Right Now!
        </h2>

        {todaysSchedule ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chapter
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(todaysSchedule).filter(([key]) => key !== 'day').map(([time, subjects]) => (
                  Object.entries(subjects).map(([subject, chapters], index) => (
                    chapters.map((chapter: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, chapterIndex: number) => (
                      <tr key={`${time}-${subject}-${chapter}`}>
                        {chapterIndex === 0 && (
                          <td className="px-6 py-4 whitespace-nowrap" rowSpan={chapters.length}>
                            <div className="text-sm text-gray-900">{time}</div>
                          </td>
                        )}
                        {chapterIndex === 0 && (
                          <td className="px-6 py-4 whitespace-nowrap" rowSpan={chapters.length}>
                            <div className="text-sm text-gray-900">{subject?.toString().replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{chapter?.toString().replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</div>
                        </td>
                      </tr>
                    ))
                  ))
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-md text-gray-700">
            No tests are scheduled for today.
          </p>
        )}

      </div>
    </div>
  );
};

export default NoLiveTestsPage;