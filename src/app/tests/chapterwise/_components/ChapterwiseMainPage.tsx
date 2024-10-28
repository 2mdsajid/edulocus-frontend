'use client'

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ChapterList from './ChapterList';
import { TTotalQuestionsPerSubjectAndChapter } from './schema';

type Props = {
    data: TTotalQuestionsPerSubjectAndChapter
};

const ChapterwiseMainPage = (props: Props) => {

    const { data: totalQuestionsPerSubjectAndChapterData } = props;

    const [selectedSubject, setSelectedSubject] = useState<string>(Object.keys(totalQuestionsPerSubjectAndChapterData)[0]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSubjectClick = (subject: string) => {
        setSelectedSubject(subject);
        setSearchQuery('');  // Reset search query when a new subject is selected
    };

    return (
        <div className='w-full p-6'>
            <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(totalQuestionsPerSubjectAndChapterData).map((subject) => (
                    <div key={subject} onClick={() => handleSubjectClick(subject)} className="cursor-pointer">
                        <Badge className={`${subject === selectedSubject ? 'bg-gray-500' : ''}`}>
                            {subject}
                        </Badge>
                    </div>)
                )}
            </div>

            {selectedSubject && (
                <>
                    <h3 className="text-xl text-black mb-4">Chapters for {selectedSubject}</h3>
                    <Input
                        type="text"
                        placeholder={`Search chapters...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-4"
                    />
                    <ChapterList
                        chapters={totalQuestionsPerSubjectAndChapterData[selectedSubject]}
                        selectedSubject={selectedSubject}
                        searchQuery={searchQuery}
                    />
                </>
            )}
        </div>
    );
};

export default ChapterwiseMainPage;
