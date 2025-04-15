'use client'

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ChapterList from './ChapterList';
import { Book, Search } from 'lucide-react';
import { subjectData } from '@/lib/data';
import DropDownInput from '@/components/reusable/DropDownInput';
import { TTotalQuestionsPerSubjectAndChapter } from '@/lib/schema/tests.schema';

type Props = {
    data: TTotalQuestionsPerSubjectAndChapter
};

const ChapterwiseMainPage = (props: Props) => {

    const { data: totalQuestionsPerSubjectAndChapterData } = props;

    const [selectedSubject, setSelectedSubject] = useState<string>(Object.keys(totalQuestionsPerSubjectAndChapterData).sort()[0]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSubjectClick = (subject: string) => {
        setSelectedSubject(subject);
        setSearchQuery('');  // Reset search query when a new subject is selected
    };



    return (
        <div className='w-full '>
            <div className="flex-wrap gap-2 mb-6 hidden md:flex">
                {Object.keys(totalQuestionsPerSubjectAndChapterData).sort().map((subject) => {
                    const { icon: SubjectIcon, name } = subjectData[subject] || { icon: Book, name: subject.replace(/_/g, ' ') }
                    return <div key={subject} onClick={() => handleSubjectClick(subject)} className="cursor-pointer">
                        <Badge
                            className={`${subject === selectedSubject
                                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-black'
                                } transition-colors duration-200 py-1 text-xs`}
                        >
                            <SubjectIcon className="w-4 h-4 mr-1" />
                            {name.toUpperCase().replace(/_/g, " ")}
                        </Badge>
                    </div>
                })}
            </div>

            <div className="mb-6 md:hidden">
                <DropDownInput
                label='subject'
                labelClassName='text-lg font-bold text-black dark:text-purple-100 mb-3'
                category='Choose A Subject'
                value={selectedSubject}
                dropdownMenu={Object.keys(totalQuestionsPerSubjectAndChapterData).sort()}
                onChange={(value) => handleSubjectClick(value)}
                />
            </div>

            {selectedSubject && (
                <>
                    <h3 className="text-lg font-bold text-black dark:text-purple-100 mb-3">
                        Chapters for {selectedSubject.toUpperCase().replace(/_/g, " ")}
                    </h3>
                    <div className="relative mb-4 max-w-lg">
                        <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <Input
                            type="text"
                            placeholder={`Search chapters...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white dark:bg-purple-800 border-purple-300 dark:border-purple-600 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
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
