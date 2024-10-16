import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TTypeOfTestsAndDescription } from './schema'

const TestTypeCard = ({ type, description, icon }: TTypeOfTestsAndDescription) => {
  return (
    <Link href={`/tests/${type.toLowerCase()}`}>
      <Card className="flex items-center hover:shadow-lg transition-shadow p-4">
        <p className="flex-shrink-0 text-5xl "> {/* Enlarge the emoji */}
          {icon}
        </p>
        <CardHeader>
          <CardTitle>{type.replace(/_/g, ' ')}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default TestTypeCard
