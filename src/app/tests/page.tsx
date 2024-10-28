import { typeOfTestsAndDescriptionData } from '@/lib/data';
import TestTypeCard from './_components/TestTypeCard';

export default async function Page() {
  return (
    <div className="w-full pt-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold  text-purple-800 dark:text-purple-100 mb-12">
          Types of Tests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {typeOfTestsAndDescriptionData.map((testType) => (
            <TestTypeCard
              key={testType.type}
              type={testType.type}
              description={testType.description}
              icon={testType.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}