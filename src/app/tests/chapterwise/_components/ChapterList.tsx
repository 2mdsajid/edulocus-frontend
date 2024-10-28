import React from 'react';
import ChapterCard from './ChapterCard';

type Props = {
  chapters: { [chapter: string]: number };
  searchQuery: string;
  selectedSubject: string;
};

const ChapterList: React.FC<Props> = ({ chapters, searchQuery, selectedSubject }) => {
  const filteredChapters = Object.entries(chapters).filter(([chapter]) =>
    chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredChapters.length === 0) {
    return <div>No chapters found.</div>;
  }

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
      {filteredChapters.map(([chapter, number]) => (
        <ChapterCard
        key={chapter}
          selectedSubject={selectedSubject}
          chapter={chapter}
          count={number}
        />
      ))}
    </div>
  );
};

export default ChapterList;
