import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, PlayCircle, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { TBaseCustomTest } from '@/lib/schema/tests.schema';
import { Button } from '@/components/ui/button';

type Props = {
  tests: TBaseCustomTest[];
};

const TestList = ({ tests }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-4 sm:p-4 gap-3">
    {tests.map(test => (
      <Link key={test.id} href={`/tests/view/${test.id}`} className="block">
        <div className="shadow border hover:shadow-lg transition-all duration-300 bg-white group flex flex-col">
          <div className="flex justify-between h-full">
            <div className="w-fit p-3 space-y-1 ">
              <div className="text-gray-800 text-xs font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                {new Date(test.date).toLocaleDateString()}
              </div>
              <div className="flex items-start justify-start">
                <div className="text-black tracking-wide text-sm font-semibold uppercase group-hover:text-gray-600 transition-colors duration-300 flex items-center gap-2">
                  {test.name.split('-')[0].trim()} - {tests.length - tests.indexOf(test)}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <p className="flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full px-4">
                  <ShieldQuestion className='h-4 w-4 text-gray-700' /> {`${test.questions.length} questions`}
                </p>
              </div>
            </div>
            <div className="flex ">
              <Button className="h-full bg-gray-700 hover:bg-gray-800 text-white flex items-center justify-center">
                <PlayCircle className="w-6 h-6" /> Start
              </Button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  );
}

export default TestList;
