'use client'

import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons for navigation
import { ChapterWiseSyllabus, TChapterWiseSyllabus } from '@/lib/chap_syllabus';

type Props = {
  schedule: TChapterWiseSyllabus;
};

const DailySyllabusPage = (props: Props) => {
  // Get today's date in "month_day" format (e.g., "july_3")
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' }).toLowerCase();
  const day = today.getDate();
  const todayStr = `${month}_${day}`;

  // State to manage the currently displayed schedule's index
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    // Find today's schedule index when the component mounts
    const initialIndex = props.schedule.findIndex(item => item.day === todayStr);
    if (initialIndex !== -1) {
      setCurrentDayIndex(initialIndex);
    } else {
      // If today's schedule isn't found, find the next closest future date
      const sortedSchedule = [...props.schedule].sort((a, b) => {
        const [aMonth, aDay] = a.day.split('_');
        const [bMonth, bDay] = b.day.split('_');
        const dateA = new Date(today.getFullYear(), new Date(Date.parse(aMonth + " 1, 2000")).getMonth(), parseInt(aDay));
        const dateB = new Date(today.getFullYear(), new Date(Date.parse(bMonth + " 1, 2000")).getMonth(), parseInt(bDay));
        return dateA.getTime() - dateB.getTime();
      });

      const nextFutureIndex = sortedSchedule.findIndex(item => {
        const [itemMonth, itemDay] = item.day.split('_');
        const itemDate = new Date(today.getFullYear(), new Date(Date.parse(itemMonth + " 1, 2000")).getMonth(), parseInt(itemDay));
        return itemDate >= today;
      });

      if (nextFutureIndex !== -1) {
        // Set the index to the first available future schedule in the original array
        const originalIndex = props.schedule.findIndex(item => item.day === sortedSchedule[nextFutureIndex].day);
        setCurrentDayIndex(originalIndex);
      }
    }
  }, [props.schedule, todayStr]);

  const displayedSchedule = props.schedule[currentDayIndex];

  // Functions to navigate through the schedule
  const goToPreviousDay = () => {
    setCurrentDayIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const goToNextDay = () => {
    setCurrentDayIndex(prevIndex => Math.min(props.schedule.length - 1, prevIndex + 1));
  };

  return (
      <div className="max-w-xl w-full space-y-3 text-center bg-white p-3 rounded-xl shadow-lg border border-gray-200">
      
        <h2 className="my-3 text-2xl font-extrabold text-gray-900">
          Chapter Wise Syllabus
        </h2>

        {displayedSchedule ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {/* Display the full date for the displayed schedule */}
              {new Date(today.getFullYear(), new Date(Date.parse(displayedSchedule.day.split('_')[0] + " 1, 2000")).getMonth(), parseInt(displayedSchedule.day.split('_')[1])).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
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
                  {Object.entries(displayedSchedule).filter(([key]) => key !== 'day').map(([time, subjects]) => (
                    Object.entries(subjects).map(([subject, chapters], index) => (
                      (chapters as string[]).map((chapter: string, chapterIndex: number) => ( // Explicitly cast chapters to string[]
                        <tr key={`${time}-${subject}-${chapter}`}>
                          {chapterIndex === 0 && (
                            <td className="px-6 py-4 whitespace-nowrap" rowSpan={(chapters as string[]).length}>
                              <div className="text-sm text-gray-900">{time.toUpperCase()}</div>
                            </td>
                          )}
                          {chapterIndex === 0 && (
                            <td className="px-6 py-4 whitespace-nowrap" rowSpan={(chapters as string[]).length}>
                              <div className="text-sm text-gray-900">{subject?.toString().replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</div>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{chapter?.toString().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</div>
                          </td>
                        </tr>
                      ))
                    ))
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={goToPreviousDay}
                disabled={currentDayIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ChevronLeft className="h-5 w-5 mr-1" /> Previous Day
              </button>
              <button
                onClick={goToNextDay}
                disabled={currentDayIndex === props.schedule.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next Day <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          </>
        ) : (
          <p className="mt-4 text-md text-gray-700">
            No schedule available. Please check back later!
          </p>
        )}
      </div>
  );
};

export default DailySyllabusPage;