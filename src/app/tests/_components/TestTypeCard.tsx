import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';
import { TTypeOfTestsAndDescription, TAccessLevel } from '@/lib/data'; // Adjust path if needed

type TestTypeCardProps = {
  card: TTypeOfTestsAndDescription;
  isLocked: boolean; // Is the card locked due to subscription status?
  isAvailable: boolean; // Is the card globally available or upcoming?
};

export default function TestTypeCard({ card, isLocked, isAvailable }: TestTypeCardProps) {
  const { icon: Icon, title, description, accessLevel, href } = card;

  const cardContent = (
    <>
      <div className="flex items-center justify-between">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
          <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        </div>
        {isAvailable && accessLevel === 'PREMIUM' && (
          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${isLocked ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
            Premium
          </span>
        )}
        {!isAvailable && (
            <span className="px-3 py-1 text-xs font-bold text-gray-800 uppercase bg-gray-200 rounded-full">
                Upcoming
            </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="flex items-center justify-end mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        {isLocked ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            <span>Upgrade to Access</span>
          </>
        ) : isAvailable ? (
          <>
            <span>Start Test</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        ) : (
          <span>Coming Soon</span>
        )}
      </div>
    </>
  );

  const isClickable = isAvailable && !isLocked;
  const finalHref = isLocked ? '/membership' : href;

  return (
    <Link
      href={finalHref}
      className={`group block p-6 bg-white dark:bg-gray-800 border rounded-xl transition-all duration-300
        ${isClickable ? 'border-gray-200 dark:border-gray-700 shadow-sm hover:border-indigo-400 hover:shadow-lg dark:hover:border-indigo-600' : ''}
        ${!isAvailable ? 'border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed' : ''}
        ${isLocked ? 'border-yellow-300 dark:border-yellow-700 shadow-sm hover:shadow-lg hover:border-yellow-400' : ''}
      `}
    >
      {cardContent}
    </Link>
  );
}
