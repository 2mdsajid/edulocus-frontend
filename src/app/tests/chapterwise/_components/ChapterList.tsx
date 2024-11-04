import React from 'react'
import ChapterCard from './ChapterCard'
import { FileText } from 'lucide-react'

type Props = {
  chapters: { [chapter: string]: number }
  searchQuery: string
  selectedSubject: string
}

export default function ChapterList({ chapters, searchQuery, selectedSubject }: Props) {
  const filteredChapters = Object.entries(chapters).filter(([chapter]) =>
    chapter.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredChapters.length === 0) {
    return (
      <div className="text-center py-8 text-purple-600 dark:text-purple-300">
        <FileText className="w-12 h-12 mx-auto mb-4" />
        <p className="text-lg">No chapters found.</p>
      </div>
    )
  }

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5'>
      {filteredChapters.map(([chapter, number]) => (
        <ChapterCard
          key={chapter}
          selectedSubject={selectedSubject}
          chapter={chapter}
          count={number}
        />
      ))}
    </div>
  )
}