import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { TBaseCustomTest } from './schema';

type Props = {
  tests: TBaseCustomTest[];
};

const TestList = ({ tests }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 sm:p-4 bg-bg1 gap-3">
    {tests.map(test => (
      <Link key={test.id} href={`/tests/view/${test.id}`} className="block">
        <Card className="hover:shadow-lg transition-all duration-300 border-color3 hover:border-color5 bg-primary group">
          <CardHeader className="space-y-1">
            <div className="flex items-start justify-start">
              <CardTitle className="text-black tracking-wide text-xl uppercase group-hover:text-gray-600 transition-colors duration-300 flex items-center gap-2">
                {/* <ClipboardList className="w-6 h-6 text-color7" /> */}
                {test.name}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-color6" />
              {new Date(test.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-color1 rounded-full px-4 py-1 ">
                <ShieldQuestion className='h-4 w-4'/> {`${test.questions.length} questions`}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
  );
}

export default TestList;
