import { TBaseCustomTest } from '@/lib/schema/tests.schema';
import { ArrowRight, Calendar, ClipboardList, HelpCircle } from 'lucide-react';
import Link from 'next/link';

type Props = {
  tests: TBaseCustomTest[];
};

const TestList = ({ tests }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8">
      {tests.map(test => (
        <Link 
          key={test.id} 
          href={`/tests/view/${test.id}`} 
          className="group block h-full"
        >
          <div className="flex flex-col h-full overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-600">
            
            {/* Icon */}
            <div className="mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <ClipboardList className="h-8 w-8" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-grow">
              {test.name}
            </h3>
            
            {/* Metadata */}
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(test.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                <span>{test.questions.length} Questions</span>
              </div>
            </div>

            {/* Call to Action (appears on hover) */}
            <div className="mt-auto pt-6">
              <div className="flex items-center font-semibold text-purple-600">
                Start Test
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TestList;