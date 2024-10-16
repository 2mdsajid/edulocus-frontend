import { TQuestion, TBaseOption } from '@/app/tests/_components/schema'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ParsedElement } from '@/lib/utils'

type Props = {
    question: TQuestion
    index: number
    getInput: (value: string, id: string) => void
}

const TestQuestionRender = (props: Props) => {
    const { question, index, getInput } = props
    return (
        <div className={` question mb-5 p-3 shadow-md dark:border dark:border-dark-accent3 !bg-accent3 dark:!bg-dark-accent3 text-black dark:!text-white rounded-md`}>
            <div className='flex gap-4 justify-between items-start w-full'>
                <div className="qn text-md flex items-start text-lg">
                    <p>{ParsedElement(`Q.${index + 1}&nbsp;&nbsp;  ${question.question}`)}</p>
                    {/* {question?.images && <img src={question.images['qn']} loading="lazy" />} */}
                    {/* <SunEditorPreviewer className='!bg-accent3 dark:!bg-dark-accent3 text-black dark:!text-white !text-xl' image={question.images && question.images['qn']} text={`Q.${index + 1}&nbsp;&nbsp;  ${question.question}`} /> */}
                </div>
                {/* {isHexadecimal(question.id) && isHexadecimal(session?.foken as string) && <QuestionReportDialog icon={<MdOutlineReportGmailerrorred />} token={session?.foken as string} type='report' questionId={question.id} />} */}
            </div>
            <RadioGroup onValueChange={(value) => getInput(value, question.id)} className='flex flex-col gap-4 w-full my-3 '>
                {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option} className="flex items-center w-full border dark:border-gray-500 rounded-md pl-3  has-[:checked]:border-2 has-[:checked]:border-blue-500 has-[:checked]:dark:border-blue-500 has-[:checked]:dark:bg-blue-900 has-[:checked]:bg-blue-200 ">
                        <RadioGroupItem value={`${option}`} id={`${question.id}_${option}`} className='hidden border h-0 w-0 has-[:checked]:bg-blue-500' ></RadioGroupItem>
                        <Label
                            htmlFor={`${question.id}_${option}`}
                            className='w-full flex items-center cursor-pointer border-green-400 p-2 pl-0 text-lg'
                        >
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <p className='flex gap-1'>{option} <span>)</span></p>
                                    <p className=''>{ParsedElement(question.options[option as keyof TBaseOption])}</p>
                                </div>
                                {/* {question?.images && <img src={question?.images[option]} loading='lazy' />} */}
                            </div>
                            {/* <SunEditorPreviewer className=' !bg-accent3 dark:!bg-dark-accent3 text-black dark:!text-white !text-xl' image={question.images && question.images[option]} text={question.options[option]} /> */}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            {/* {session?.user?.role && SUPERADMINS.includes(session.user.role) && <p>{question.answer}</p>} */}
        </div>)
}

export default TestQuestionRender