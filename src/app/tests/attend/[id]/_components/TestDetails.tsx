import React from 'react'
import { User, HelpCircle, Code, Clipboard, CheckCircle, Tag } from 'lucide-react'

type Props = {
  id: string
  questionsCount: string
  testName: string
  username: string
  slug: string
  createdBy: string
}

const TestDetails = (props: Props) => {
  const { id: testid, questionsCount, testName, username, slug, createdBy } = props

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow border overflow-hidden">
        <div className="p-6 sm:p-8">
          {testName && (
            <h2 className="text-3xl font-bold  mb-6 text-center">
               {testName}
            </h2>
          )}

          <div className="space-y-4">
            {/* Created By */}
            {username && (
              <div className="flex items-center space-x-4 ">
                <div className="bg-green-500 rounded-full p-2">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Created By</p>
                  <p className="font-semibold">{username}</p>
                </div>
              </div>
            )}

            {/* Created By (Admin or User) */}
            {createdBy && (
              <div className="flex items-center space-x-4 ">
                <div className="bg-blue-500 rounded-full p-2">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Created By</p>
                  <p className="font-semibold">{createdBy}</p>
                </div>
              </div>
            )}

            {/* Number of Questions */}
            {questionsCount && (
              <div className="flex items-center space-x-4 ">
                <div className="bg-red-500 rounded-full p-2">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Number of Questions</p>
                  <p className="font-semibold">{questionsCount}</p>
                </div>
              </div>
            )}

            {/* Test Code */}
            {slug && (
              <div className="flex items-center space-x-4 ">
                <div className="bg-yellow-500 rounded-full p-2">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Test Code</p>
                  <p className="font-semibold">{slug}</p>
                </div>
              </div>
            )}

            {/* Test ID */}
            {testid && (
              <div className="flex items-center space-x-4 ">
                <div className="bg-purple-500 rounded-full p-2">
                  <Clipboard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Test ID</p>
                  <p className="font-semibold">{testid}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default TestDetails
