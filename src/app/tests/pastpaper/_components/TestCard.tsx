import { TBaseCustomTest } from "@/lib/schema/tests.schema";
import { ArrowRight, BookOpen, Calendar, HelpCircle, LockIcon } from 'lucide-react';
import Link from 'next/link';

// Define the component's props, including the new required prop
interface TestCardProps extends TBaseCustomTest {
  isEffectivelyUnlocked: boolean;
}

const TestCard = ({ id, name, date, questions, pastPaper, isEffectivelyUnlocked }: TestCardProps) => {
  const testName = name || `${pastPaper?.affiliation} - ${pastPaper?.year}`;
  
  // The card's lock state is now controlled entirely by the prop from the parent
  const isUnlocked = isEffectivelyUnlocked;

  // The destination URL depends on the final lock state
  const destinationUrl = isUnlocked ? `/tests/view/${id}` : '/membership';

  return (
    <Link href={destinationUrl} className="group block h-full">
      <div className={`flex flex-col h-full overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 ${
        isUnlocked ? 'hover:border-purple-300 dark:hover:border-purple-600' : 'hover:border-amber-400 dark:hover:border-amber-500'
      } dark:bg-gray-800 dark:border-gray-700`}>
        
        <div className="mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isUnlocked ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            <BookOpen className="h-7 w-7" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testName}</h3>
        
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5" />
            <span>{questions.length} Questions</span>
          </div>
        </div>

        <div className="mt-auto pt-6">
          {isUnlocked ? (
            <div className="flex items-center font-semibold text-purple-600 dark:text-purple-400">
              Start Test
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          ) : (
            <div className="flex items-center font-semibold text-amber-600 dark:text-amber-400">
              <LockIcon className="mr-2 h-4 w-4" />
              Unlock Test
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default TestCard;