import { Button } from "@/components/ui/button";
import { TBaseCustomTest } from "@/lib/schema/tests.schema";
import { ArrowRight, BookOpen, Calendar, HelpCircle, LockIcon } from 'lucide-react';
import Link from 'next/link';

const TestCard = ({ id, name, date, questions, pastPaper }: TBaseCustomTest) => {
  const testName = name || `${pastPaper?.affiliation} - ${pastPaper?.year}`;
  const isUnlocked = pastPaper?.isUnlocked ?? true; // Default to unlocked if not a past paper

  // The entire card becomes a link, directing to the test or the membership page
  const destinationUrl = isUnlocked ? `/tests/view/${id}` : '/membership';

  return (
    <Link href={destinationUrl} className="group block h-full">
      <div className={`relative flex flex-col h-full overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 ${
        isUnlocked ? 'hover:border-purple-300 dark:hover:border-purple-600' : 'hover:border-amber-400 dark:hover:border-amber-500'
      } dark:bg-gray-800 dark:border-gray-700`}>
        
        {/* Unlocked State Content */}
        {isUnlocked ? (
          <>
            <div className="mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
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
              <div className="flex items-center font-semibold text-purple-600">
                Start Test
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </>
        ) : (
          // Locked State Content with Overlay Effect
          <>
            <div className="blur-sm">
              <div className="mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  <BookOpen className="h-7 w-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">{testName}</h3>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-400 dark:text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1.5" />
                  <span>{questions.length} Questions</span>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-800/70 p-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white mb-4">
                    <LockIcon className="h-8 w-8" />
                </div>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-300">Unlock with Membership</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to learn more</p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default TestCard;