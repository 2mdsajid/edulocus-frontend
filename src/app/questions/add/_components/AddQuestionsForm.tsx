'use client'

import DropDownInput from '@/components/reusable/DropDownInput'
import ReusableLInk from '@/components/reusable/ReusableLink'
import SubmitButton from '@/components/reusable/SubmitButton'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, dialogCloseFunction, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import React, { useRef, useState } from 'react'
import { isTopicInSyllabus } from '@/lib/methods/questions.methods'
import { TPGSyllabus } from '@/lib/schema/questions.schema'
import { addQuestions, createPastTest } from '@/lib/actions/questions.actions'
import ChapterInput from './ChapterInput'
import { isExpectedFileFormat } from '@/lib/methods/questions.methods'
import { TAddQuestion, TAnswer, TExpectedQuestionFormatFromFile, TStreamHierarchy } from '@/lib/schema/questions.schema'
import QuestionCard from './QuestionCard'
import SubjectInput from './SubjectInput'
import StreamInput from './StreamInput'
import CategoryInput from './CategoryInput'
import AffiliationInput from './AffiliationInput'
import { Input } from '@/components/ui/input'

const API_END_POINTS = {
    SAME_SUBJECT: "add-multiple-question-for-same-subject-and-chapter",
    DIFFERENT_SUBJECT: "add-multiple-question-for-different-subject-and-chapter",
    PAST_PAPER: ""
} as const

type TApiEndPointsKeys = keyof typeof API_END_POINTS;

type Props = {
    syllabus: TPGSyllabus
    streamHirearchy: TStreamHierarchy[]
}

const AddQuestionsForm = (props: Props) => {
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // for past questions only -----
    const [isPastQuestion, setIsPastQuestion] = useState<boolean | null>(null);
    const [stream, setStream] = useState(props.streamHirearchy[0].name)
    const [category, setCategory] = useState<string | null>(null);
    const [year, setYear] = useState(2007)
    const [affiliation, setAffiliation] = useState<string | null>(null)

    const [compatiblequestions, setCompatibleQuestions] = useState<TExpectedQuestionFormatFromFile[]>([])
    const [incompatiblequestions, setIncompatiblequestions] = useState<any[]>([])

    const [file, setFile] = useState<File | null>(null);
    const [issubmitclicked, setIssubmitclicked] = useState(false)

    const [modeOfUpload, setModeOfUpload] = useState<TApiEndPointsKeys>(Object.keys(API_END_POINTS)[0] as TApiEndPointsKeys);

    // to handle past radio buttons
    const handlePastQuestionChange = (value: boolean) => {
        if (value === true) {
            setModeOfUpload("DIFFERENT_SUBJECT")
        }
        setIsPastQuestion(value);
    };

    // this will handle the upload file and check the expeq format of questions in the file
    const handleJsonFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result as string;
                try {
                    const jsonData = JSON.parse(fileContent);
                    const invalidData = jsonData.filter((item: any) => !isExpectedFileFormat(item));
                    if (invalidData.length > 0) {
                        setIncompatiblequestions(invalidData)
                        return toast({
                            variant: "destructive",
                            title: "Warning",
                            description: "Some objects do not match the expected structure:",
                        });
                    }
                    toast({
                        variant: "success",
                        title: "Compatible",
                        description: "scroll and make changes before uploading!",
                    });
                    setCompatibleQuestions(jsonData);
                } catch (error: any) {
                    return toast({
                        variant: "destructive",
                        title: "Warning",
                        description: "Error while reading the file ===> " + error.message,
                    });
                }
            };
            reader.readAsText(file);
        } else {
            console.error('No file selected.');
        }
    };


    // this will edit uploaded questions
    const editQuestion = (value: string, field: string, i: number) => {
        setCompatibleQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions]; // Shallow copy the array

            if (['a', 'b', 'c', 'd'].includes(field)) {
                updatedQuestions[i] = {
                    ...updatedQuestions[i],
                    options: {
                        ...updatedQuestions[i].options,
                        [field]: value,
                    },
                };
            } else {
                updatedQuestions[i] = {
                    ...updatedQuestions[i],
                    [field]: value,
                };
            }

            return updatedQuestions;
        });

        // localStorage.setItem('r_tests', JSON.stringify({ name, subjectWiseQuestions }));
    };

    // this function will delete a selected question from the uploaded file
    const handleDeleteQuestion = (indexToDelete: number) => {
        setCompatibleQuestions((compatiblequestions: any) => {
            return compatiblequestions.filter((question: any, idx: number) => idx !== indexToDelete);
        });
        console.log('sfasd')
        dialogCloseFunction();
    };

    // this will send the questions to the backend
    const sendFIle = async () => {
        setIssubmitclicked(true)
        const isChapterInSubject = isTopicInSyllabus(props.syllabus, subject, chapter)
        if (modeOfUpload === "SAME_SUBJECT" && (!subject || !chapter)) {
            setIssubmitclicked(false)
            return toast({
                variant: "destructive",
                title: "Warning",
                description: "a subject  or chapter is missing",
            })
        }

        if (modeOfUpload === "SAME_SUBJECT" && !isChapterInSubject) {
            setIssubmitclicked(false)
            return toast({
                variant: "destructive",
                title: "Warning",
                description: "a subject or chapter is mismatched",
            })
        }

        // Map compatible questions to TAddQuestion format from TExpectedQuestionFormat
        const questions: TAddQuestion[] = compatiblequestions.map((q) => ({
            question: q.qn,
            answer: q.ans as TAnswer,
            explanation: q.exp || '',
            subject: modeOfUpload === "SAME_SUBJECT" ? subject : q.subject || "",
            chapter: modeOfUpload === "SAME_SUBJECT" ? chapter : q.chapter || "",
            unit: "",
            difficulty: q.difficulty || 'm',
            options: q.options,
        }));


        // sending the past paper data to another endpoint to avoid adding qustion conflicts
        if (isPastQuestion) {
            const pastTestPayloadData = {
                year,
                stream,
                affiliation,
                category,
                questions
            }

            const { data, message } = await createPastTest(pastTestPayloadData)
            setIssubmitclicked(false)
            if (!data || data === null || data === undefined) {
                return toast({
                    variant: "destructive",
                    title: "Warning",
                    description: message,
                })
            }
            toast({
                variant: "success",
                title: "Success",
                description: message,
            })

        } else {
            const apiEndPoint = API_END_POINTS[modeOfUpload]
            const { data, message } = await addQuestions(questions, apiEndPoint)
            setIssubmitclicked(false)
            if (!data || data === null || data === undefined) {
                return toast({
                    variant: "destructive",
                    title: "Warning",
                    description: message,
                })
            }
            toast({
                variant: "success",
                title: "Success",
                description: message,
            })
        }
        setCompatibleQuestions([])
        fileInputRef.current!.value = '';
        setIssubmitclicked(false)
        return
    }


    return (
        <div className='flex flex-col gap-3 w-full max-w-3xl mx-auto'>
            <Card className='px-3 py-4 bg-accent3 dark:bg-dark-accent3 space-y-3'>
                <div className='flex flex-col gap-3 itemsc'>
                    <CardTitle>Add Questions Via JSON File</CardTitle>
                    <CardDescription>Please read the syllabus first <span><ReusableLInk link='/questions/syllabus'>here</ReusableLInk></span> before.</CardDescription>
                </div>

                {/* past questions radio buttons */}
                <div>
                    <label>Is this a past question?</label>
                    <div className='flex gap-3'>
                        <label>
                            <input
                                type="radio"
                                name="isPastQuestion"
                                value="true"
                                checked={isPastQuestion === true}
                                onChange={() => handlePastQuestionChange(true)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isPastQuestion"
                                value="false"
                                checked={!isPastQuestion}
                                onChange={() => handlePastQuestionChange(false)}
                            />
                            No
                        </label>
                    </div>
                </div>

                {isPastQuestion
                    && <div className='space-y-3'>
                        <Input
                            type='number'
                            value={year}
                            onChange={(e) => setYear(Number(e.currentTarget.value))}
                            placeholder='year'
                        />

                        <StreamInput
                            streamHierarchy={props.streamHirearchy}
                            stream={stream}
                            onChange={(value) => setStream(value)}
                        />

                        {stream
                            && <CategoryInput
                                streamHierarchy={props.streamHirearchy}
                                stream={stream}
                                category={category}
                                onChange={(value) => setCategory(value)}
                            />
                        }

                        {category
                            && <AffiliationInput
                                streamHierarchy={props.streamHirearchy}
                                stream={stream}
                                category={category}
                                affiliation={affiliation}
                                onChange={(value) => setAffiliation(value)}
                            />
                        }
                    </div>}



                <input type='file' accept='.json' onChange={handleJsonFileUpload} ref={fileInputRef} />

                {!isPastQuestion &&
                    <div>
                        <DropDownInput
                            category='mode'
                            value={modeOfUpload}
                            dropdownMenu={Object.keys(API_END_POINTS)}
                            onChange={(value: TApiEndPointsKeys) => setModeOfUpload(value)}
                        />
                    </div>}

                {/* it will ask subjects only if it is of same subject questions */}
                {(modeOfUpload === "SAME_SUBJECT")
                    && <div className='flex flex-col mt-5 gap-4'>
                        <SubjectInput
                            syllabus={props.syllabus}
                            subject={subject}
                            onChange={(value) => setSubject(value)}
                        />
                        {subject
                            && <ChapterInput
                                syllabus={props.syllabus}
                                subject={subject}
                                chapter={chapter}
                                onChange={(value) => setChapter(value)}
                            />
                        }
                    </div>}

                {/* this is the upload button */}
                {compatiblequestions.length > 0
                    && <Dialog>
                        <DialogTrigger>
                            <div className='w-max bg-black dark:bg-white text-white dark:text-black px-2 py-2 rounded-md text-sm '>Add Questions</div>
                        </DialogTrigger>
                        <DialogContent>
                            <p>Please make sure you selected the correct chapter, subject and unit. Also make the necessary changes as this will be the final confirmation before commiting them to the database.</p>
                            {modeOfUpload === "SAME_SUBJECT" && <div className='flex flex-col gap-0'>
                                <p><span className="font-semibold text-gray-600 dark:text-gray-400">subject:</span> {subject}</p>
                                <p><span className="font-semibold text-gray-600 dark:text-gray-400">chapter:</span> {chapter}</p>
                            </div>}
                            <SubmitButton initialstate='send' loadingstate='sending' isLoadingState={issubmitclicked} onClick={sendFIle} />
                        </DialogContent>
                    </Dialog>
                }
            </Card>

            {/* render the questions in the input fields */}
            {compatiblequestions.length > 0 && (
                <div className="flex flex-col gap-2">
                    <p className="text-xl my-3 font-semibold tracking-wider">Questions</p>
                    {compatiblequestions.map((q, i) => (
                        <QuestionCard
                            key={i}
                            question={q}
                            index={i}
                            editQuestion={editQuestion}
                            handleDeleteQuestion={handleDeleteQuestion}
                        />
                    ))}
                </div>
            )}

            {/* render the incompatible questions */}
            {incompatiblequestions.length > 0 &&
                <div className='max-h-[40vh] overflow-auto p-1 px-2 bg-black text-white'>
                    <p className='text-xl my-3 font-semibold tracking-wider'>Incompatible Questions</p>
                    {incompatiblequestions.map((q, i) => {
                        return <div key={i}>
                            {JSON.stringify(q)}
                            <p>-------</p>
                        </div>
                    })}
                </div>}
        </div>
    )
}

export default AddQuestionsForm