import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineQuestion } from 'react-icons/ai';
import { BiCheck, BiStar, BiTimeFive, BiX } from 'react-icons/bi';
import { IoMdCheckbox } from 'react-icons/io';
import { PiWatchLight } from 'react-icons/pi';

type Props = {
    total_timetaken: number
    total_questions: number
    questions_attempt: number
    corrrect_attempt: number
}

const TestBasicAnalysis = (props: Props) => {
    const { total_timetaken, questions_attempt, total_questions, corrrect_attempt } = props
    return (
        <div className='w-full flex flex-col gap-4'>
            {total_timetaken > 0 && <Card className='flex items-center rounded-md border  border-green-100 shadow-md'>
                <div className='text-5xl pl-4 text-green-400'>
                    <PiWatchLight />
                </div>
                <CardHeader className=''>
                    <CardTitle className='text-green-400'>{total_timetaken / 1000} sec</CardTitle>
                    <CardDescription className='text-green-400 dark:text-green-100' >Total Time Taken</CardDescription>
                </CardHeader>
            </Card>}
            {total_timetaken > 0 &&
                <Card className='flex items-center rounded-md border  border-secondary shadow-md'>
                    <div className='text-5xl pl-4 text-secondary'>
                        <BiTimeFive />
                    </div>
                    <CardHeader>
                        <div className='text-secondary'>
                            <CardTitle>{(total_timetaken / questions_attempt) / 1000} sec</CardTitle>
                            <CardDescription className='dark:text-secondary'>
                                Average Time Taken Per Question
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>}

            <Card className='flex items-center rounded-md border  border-accent shadow-md'>
                <div className='text-5xl pl-4 text-accent'>
                    <IoMdCheckbox />
                </div>
                <CardHeader className=''>
                    <CardTitle className='text-accent'>{questions_attempt} / {total_questions}</CardTitle>
                    <CardDescription className='dark:text-accent'>
                        Total Questions Attempt
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='flex items-center rounded-md border border-green-700 shadow-md'>
                <div className='text-5xl pl-4 text-green-700'>
                    <BiCheck />
                </div>
                <CardHeader >
                    <CardTitle className='text-green-700' >{corrrect_attempt}</CardTitle>
                    <CardDescription className='dark:text-green-700'>
                        Correct Attempt
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className=' flex items-center rounded-md border border-red-700 shadow-md'>
                <div className='text-5xl pl-4 text-red-700'>
                    <BiX />
                </div>
                <CardHeader >
                    <CardTitle className='text-red-700'>{questions_attempt - corrrect_attempt}</CardTitle>
                    <CardDescription className='dark:text-red-700'>
                        Incorrect Attempt
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='flex items-center rounded-md border border-blue-700 shadow-md'>
                <div className='text-5xl pl-4 text-blue-700'>
                    <BiStar />
                </div>
                <CardHeader >
                    <CardTitle className='text-blue-700'>{corrrect_attempt - (questions_attempt - corrrect_attempt) * 0.25}</CardTitle>
                    <CardDescription className='dark:text-blue-700'>
                        Total Score
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='flex items-center rounded-md shadow-md'>
                <div className='text-5xl pl-4 text-secondary'>
                    <AiOutlineQuestion />
                </div>
                <CardHeader >
                    <CardTitle className='text-secondary'>{total_questions - questions_attempt}</CardTitle>
                    <CardDescription>Unattempt Questions</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

export default TestBasicAnalysis