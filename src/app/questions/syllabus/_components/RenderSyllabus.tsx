'use client'

import React, { useState, useEffect } from 'react';
import { TPGSyllabus } from '../../_components/schema';

type TopicProps = {
  topic: string;
  marks: number;
};

const Topic = ({ topic, marks }: TopicProps) => (
  <div className="flex justify-between border-b border-gray-300 py-2">
    <span className="text-lg font-medium text-gray-800 capitalize">{topic.replace(/_/g, ' ')}</span>
    {/* <span className="text-lg text-gray-600">{marks} Marks</span> */}
  </div>
);

type RenderSyllabusProps = {
  syllabus: TPGSyllabus;
};

export const RenderSyllabus: React.FC<RenderSyllabusProps> = ({ syllabus }) => {
  const subjectList = Object.keys(syllabus);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectList[0]);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Syllabus Overview</h2>
      
      {/* Subject Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {subjectList.map((subject) => (
          <button
            key={subject}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              selectedSubject === subject ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleSubjectSelect(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Render Selected Subject Syllabus */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700 uppercase py-2">
          {selectedSubject} ({syllabus[selectedSubject].marks} Total Marks)
        </h3>
        <div className="mt-2 space-y-2">
          {syllabus[selectedSubject].topics.map((topic) => (
            <Topic
              key={topic}
              topic={topic}
              marks={syllabus[selectedSubject].marks / syllabus[selectedSubject].topics.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
