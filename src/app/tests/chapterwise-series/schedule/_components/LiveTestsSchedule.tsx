import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// LiveTestsSchedule Component (Copied from previous turn, integrated here for completeness)
const LiveTestsSchedule: React.FC = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday

  const totalDays = daysInMonth(currentYear, currentMonth);
  const startDay = firstDayOfMonth(currentYear, currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isTestDay = (day: number) => {
    return day % 2 !== 0;
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center text-gray-400"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isCurrentDay = day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
      const testDay = isTestDay(day);

      days.push(
        <div
          key={`day-${day}`}
          className={`
            p-3 rounded-lg flex flex-col items-center justify-center font-semibold
            ${isCurrentDay ? 'bg-blue-500 text-white' : 'text-gray-800'}
            ${testDay && !isCurrentDay ? 'bg-green-200' : ''}
            ${testDay && isCurrentDay ? 'bg-blue-600' : ''}
          `}
        >
          <span>{day}</span>
          {testDay && (
            <span className={`text-xs mt-1 ${isCurrentDay ? 'text-white' : 'text-green-800'}`}>
              live test
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
         EduLocus Live Tests Schedule
        </h1>

        <div className="mb-6 flex justify-between items-center px-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-4">
          {dayNames.map(name => (
            <div key={name} className="p-2">
              {name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>

        {/* Live Test Timings Information */}
        <p className="mt-8 text-center text-lg text-gray-700">
          All scheduled live tests are conducted between <span className="font-bold">4:00 PM - 8:00 PM</span> local time.
        </p>
      </div>
    </div>
  );
};

// The main page component
type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <LiveTestsSchedule />
    </div>
  );
};

export default Page;
