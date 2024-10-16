import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { TBaseCustomTest } from './schema';

type Props = {
  tests: TBaseCustomTest[];
  typeoftest: string;
};

const TestList = ({ tests, typeoftest }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tests.map(test => (
        <Link key={test.id} href={`/tests/${typeoftest.toLowerCase()}/${test.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
              <CardDescription>{new Date(test.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{`${test.questions.length} questions`}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default TestList;
