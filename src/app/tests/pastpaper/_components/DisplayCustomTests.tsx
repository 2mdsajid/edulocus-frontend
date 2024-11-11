"use client"

import { Badge } from "@/components/ui/badge"
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { TBaseCustomTest } from '../../_components/schema'
import TestCard from './TestCard'

export default function DisplayCustomTests({ customTestsData }: { customTestsData: TBaseCustomTest[] }) {
  const searchParams = useSearchParams()
  const categoryInParams = searchParams.get('c')

  // Filter tests by category from search params
  const filteredCategoryWiseTests = customTestsData.filter(
    (test: TBaseCustomTest) => test.pastPaper?.category?.toLowerCase() === categoryInParams
  )

  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(null)

  // Get unique affiliations from the filtered category-wise tests
  const uniqueAffiliations = Array.from(
    new Set(filteredCategoryWiseTests.map((test: TBaseCustomTest) => test.pastPaper?.affiliation || null))
  ).filter((affiliation) => affiliation !== null)

  // Further filter the tests by the selected affiliation, if any
  const displayedTests = selectedAffiliation
    ? filteredCategoryWiseTests.filter(
      (test: TBaseCustomTest) => test.pastPaper?.affiliation === selectedAffiliation
    )
    : filteredCategoryWiseTests
  return (
    <div className="container mx-auto p-4">
      {uniqueAffiliations.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueAffiliations.map(affiliation => (
            <Badge
              key={affiliation}
              className={`${selectedAffiliation === affiliation
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-200 hover:bg-purple-300 text-black'
                } transition-colors duration-200 py-1 text-xs cursor-pointer`}
              onClick={() => setSelectedAffiliation(selectedAffiliation === affiliation ? null : affiliation)}
            >
              {affiliation}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(displayedTests.length > 0 ? displayedTests : filteredCategoryWiseTests).map(test => (
          <TestCard key={test.id} {...test} />
        ))}
      </div>
    </div>
  )
}
