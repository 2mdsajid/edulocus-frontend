import React from 'react';
import { User, CalendarDays, FileText } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  createdBy: string;
  date: string;
  archive: boolean;
};

const LiveTestBox = ({ id, name, createdBy, date, archive }: Props) => {
  return (
    <Link href={`/tests/view/${id}`} className="block">
      <div className="overflow-hidden bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
          {!archive && (
              <div className="relative">
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded-full">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            )}          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>

          </div>
        </div>

        <div className="space-y-2 text-gray-600">
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Created By:</span> {createdBy}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Date:</span> {date}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LiveTestBox;
