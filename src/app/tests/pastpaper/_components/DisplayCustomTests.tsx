"use client"

import { Badge } from "@/components/ui/badge"
import { TBaseCustomTest } from '@/lib/schema/tests.schema'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import TestCard from './TestCard'

export default function DisplayCustomTests({ customTestsData, isUserSubscribed }: { customTestsData: TBaseCustomTest[], isUserSubscribed: boolean }) {
  const searchParams = useSearchParams()
  const categoryInParams = searchParams.get('c')

  const filteredCategoryWiseTests = customTestsData.filter(
    (test: TBaseCustomTest) => test.pastPaper?.category?.toLowerCase() === categoryInParams
  )

  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(null)

  const uniqueAffiliations = Array.from(
    new Set(filteredCategoryWiseTests.map((test: TBaseCustomTest) => test.pastPaper?.affiliation || null))
  ).filter((affiliation) => affiliation !== null) as string[]

  const displayedTests = selectedAffiliation
    ? filteredCategoryWiseTests.filter(
      (test: TBaseCustomTest) => test.pastPaper?.affiliation === selectedAffiliation
    )
    : filteredCategoryWiseTests

  return (
    <div className="container mx-auto p-4">
      {/* Affiliation filter badges remain the same */}
      {uniqueAffiliations.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueAffiliations.map(affiliation => (
            <Badge
              key={affiliation}
              className={`${selectedAffiliation === affiliation
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
                } transition-colors duration-200 py-1 text-xs cursor-pointer`}
              onClick={() => setSelectedAffiliation(selectedAffiliation === affiliation ? null : affiliation)}
            >
              {affiliation}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {/* --- Main conditional rendering based on subscription status --- */}
        {isUserSubscribed ? (
          // --- SUBSCRIBED USER: All tests are unlocked ---
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedTests.map(test => (
                <TestCard key={test.id} {...test} isEffectivelyUnlocked={true} />
              ))}
            </div>
          </div>
        ) : (
          // --- NON-SUBSCRIBED USER: Show locked and unlocked tests separately ---
          <>
            {/* Unlocked Tests Section */}
            {displayedTests.filter(test => test.pastPaper?.isUnlocked).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedTests
                  .filter(test => test.pastPaper?.isUnlocked)
                  .map(test => (
                    <TestCard key={test.id} {...test} isEffectivelyUnlocked={true} />
                  ))}
              </div>
            )}

            {/* Locked Tests Section */}
            {displayedTests.filter(test => !test.pastPaper?.isUnlocked).length > 0 && (
              <div>
                <h2 className="flex flex-col gap-1 text-2xl font-bold tracking-wide text-black dark:text-gray-300 mb-4">
                  Locked Tests <span className="text-sm text-gray-600">( For members only. <a href="/membership" className="underline">Become a member</a> )</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayedTests
                    .filter(test => !test.pastPaper?.isUnlocked)
                    .map(test => (
                      <TestCard key={test.id} {...test} isEffectivelyUnlocked={false} />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}