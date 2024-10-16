import { TBaseOption, TQuestion } from "@/app/tests/_components/schema";
import { QUESTION_BORDER_COLOR } from "@/lib/data";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";


type Props = {
    question: TQuestion
    index: number
    token?: string
}


export const QuestionViewer = (props: Props) => {
    const { question, index } = props;
    return <div className={`border dark:border-dark-accent3 rounded-md shadow-md`}>
        <div className='flex justify-between p-2 border-b'>
            <div className='flex gap-2 p-2 '>
                <p>Q{index + 1}</p>
                {question.uans ? <p className={`${!question.uans && 'text-secondary'} ${question.uans === question.answer ? 'text-green-500' : 'text-red-500'} border-l border-r border-gray-700 dark:border-gray-400 px-2`}>{question.uans === question.answer ? 'correct' : 'incorrect'}</p> : <p className='border-l border-r px-2'>unattempt</p>}
                <p>{(question.timetaken || 0) / 1000}s</p>
            </div>
            <div>

                {/* REPORT BUTTON----------------------- */}
                {/* {props.token && isCuid(question.id) && <QuestionReportDialog icon={<MdOutlineReportGmailerrorred />} token={props.token} type='report' questionId={question._id} />} */}
            </div>
        </div>
        <div className={` question p-3 shadow-md rounded-b-md dark:border-dark-accent3 !bg-accent3 dark:!bg-dark-accent3 text-black dark:text-white `}>
            <div className='flex gap-4 justify-between items-start w-full'>
                <div className="qn text-md flex items-start ">
                    <p>{question.question}</p>
                    {/* <SunEditorPreviewer className='!bg-accent3 dark:!bg-dark-accent3 text-black dark:text-white !text-xl' image={question.images && question.images['qn']} text={`${question.question}`} /> */}
                    {/* {question.images?.qn && <img className='w-full' src={question.images?.qn} />} */}
                </div>
            </div>
            <RadioGroup className='flex flex-col gap-4 w-full my-3'>
                {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option} className={`border ${(question.answer === option) && QUESTION_BORDER_COLOR.correct} ${(question.uans === option) && (question.uans !== question.answer) && 'border-red-500'} flex items-center w-full  rounded-md pl-3 `}>
                        <Label
                            htmlFor={`${question.id}_${option}`}
                            className='w-full flex items-center p-2 '
                        >
                            <p>{question.options[option as keyof TBaseOption]}</p>
                            {/* <SunEditorPreviewer className=' !bg-accent3 dark:!bg-dark-accent3 text-black dark:text-white !text-xl' image={question.images && question.images[option as keyof TypeOption]} text={question.options[option as keyof TBaseOption]} /> */}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            <div className='p-3'>
                <p className='text-lg text-gray-700 dark:text-gray-400 font-semibold mb-2'>Explanation : </p>
                {question.explanation && <p>{question.explanation}</p>}
                {/* {question.images?.exp && <img className='w-full' src={question.images?.exp} loading='lazy' alt={'question'} />} */}
            </div>
        </div>
    </div>
}