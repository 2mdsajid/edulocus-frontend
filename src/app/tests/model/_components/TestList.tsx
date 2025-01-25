import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, PlayCircle, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { TBaseCustomTest } from '../../_components/schema';
import { Button } from '@/components/ui/button';

type Props = {
  tests: TBaseCustomTest[];
};

const TestList = ({ tests }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 sm:p-4 bg-bg1 gap-3">
    {tests.map(test => (
      <Link key={test.id} href={`/tests/view/${test.id}`} className="block">
        <Card className="shadow border hover:shadow-lg transition-all duration-300  bg-white group">
          <CardHeader className="space-y-1">
            <CardDescription className="text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-color6" />
              {new Date(test.date).toLocaleDateString()}
            </CardDescription>
            <div className="flex items-start justify-start">
              <CardTitle className="text-black tracking-wide text-xl uppercase group-hover:text-gray-600 transition-colors duration-300 flex items-center gap-2">
                {/* <ClipboardList className="w-6 h-6 text-color7" /> */}
                {test.name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-color2 rounded-full px-4 ">
                <ShieldQuestion className='h-4 w-4'/> {`${test.questions.length} questions`}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            
            <Button className="w-full bg-color7 hover:bg-color5 text-white">
              <PlayCircle className="w-6 h-6" /> Start
            </Button>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
  );
}

export default TestList;
