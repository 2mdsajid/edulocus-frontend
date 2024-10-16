import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  id: string
  questionsCount: string,
  testName: string,
  username: string
  slug: string,
  createdBy: string
}

const TestDetails = (props: Props) => {
  const { id: testid, questionsCount, testName,username, slug, createdBy } = props

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="bg-accent3 dark:bg-dark-accent3 shadow-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold my-3 text-center tracking-wide">
            {testName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="capitalize tracking-wider">
              <span className="font-bold">Username:</span> {username}
            </p>
            <p className="capitalize tracking-wider">
              <span className="font-bold">Test ID:</span> {testid}
            </p>
            <p className="capitalize tracking-wider">
              <span className="font-bold">Created By:</span> {createdBy}
            </p>
            <p className="capitalize tracking-wider">
              <span className="font-bold">Number of Questions:</span> {questionsCount}
            </p>
            <p className="capitalize tracking-wider">
              <span className="font-bold">TestCode:</span> {slug}
            </p>
            {/* {slug && (
              <p className="capitalize tracking-wider">
                <span className="font-bold">Test Code:</span>{' '}
                <a href={slug} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  {slug}
                </a>
              </p>
            )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestDetails
