import { TBaseCustomTest } from '@/lib/schema/tests.schema';
import { ArrowRight, Calendar, ClipboardList, HelpCircle, Lock } from 'lucide-react';
import Link from 'next/link';

type Props = {
  test: TBaseCustomTest;
  isLocked: boolean; // Control the locked state from the parent component
};

export const TestCard = ({ test, isLocked }: Props) => {
  // Link to membership page if the test is locked
  const href = isLocked ? '/membership' : `/tests/view/${test.id}`;

  return (
    <Link
      href={href}
      className="group block h-full"
      aria-disabled={isLocked}
      tabIndex={isLocked ? -1 : 0}
    >
      <div
        className={`
          flex flex-col h-full overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700
          ${isLocked
            ? 'opacity-60 cursor-not-allowed' // Style for locked state
            : 'group-hover:shadow-xl group-hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600' // Hover effects for unlocked state
          }
        `}
      >
        {/* Icon & Premium Badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <ClipboardList className="h-8 w-8" />
          </div>
          {test.isAvailableToPremium && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
              <Lock className="h-3 w-3" />
              <span>Premium</span>
            </div>
          )}
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

        {/* Call to Action */}
        <div className="mt-auto pt-6">
          {isLocked ? (
            <div className="flex items-center font-semibold text-yellow-600 dark:text-yellow-500">
              Upgrade to Access
              <Lock className="ml-2 h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center font-semibold text-purple-600">
              Start Test
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};