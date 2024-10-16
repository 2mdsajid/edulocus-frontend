import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TypeTypeSubjectWiseChapterScores } from './schema';

type Props = {
    data: TypeTypeSubjectWiseChapterScores
}

const TestChapterwiseScoreTable = (props: Props) => {
    const data = props.data

    return (
        <div className="w-full mx-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Subject Wise Chapter Scores</h2>
            <table className="w-full  border-collapse ">
                <Accordion type="single" className='' collapsible>
                    {Object.entries(data).map(([subject, chapters]) => (
                        <AccordionItem key={subject} value={subject} className='mb-3 border-b-0'>
                            <AccordionTrigger className='text-lg text-start border rounded px-2'>{subject}</AccordionTrigger>
                            <AccordionContent className='pt-3'>
                                <div className="grid grid-cols-7 bg-gray-200 dark:bg-gray-700">
                                    <h2 className="overflow-auto col-span-3 border border-gray-800 py-2 px-4 whitespace-nowrap">Chapter</h2>
                                    <h2 className="overflow-auto text-white border border-gray-800 py-2 px-4 whitespace-nowrap bg-violet-500">T</h2>
                                    <h2 className="overflow-auto text-white border border-gray-800 py-2 px-4 whitespace-nowrap bg-green-500">C</h2>
                                    <h2 className="overflow-auto text-white border border-gray-800 py-2 px-4 whitespace-nowrap bg-red-500">I</h2>
                                    <h2 className="overflow-auto text-white border border-gray-800 py-2 px-4 whitespace-nowrap bg-cyan-500">U</h2>
                                </div>
                                {Object.entries(chapters).map(([chapter, scores]) => (
                                    <div key={`${subject}-${chapter}`} className="overflow-auto grid grid-cols-7 border border-gray-800">
                                        <td className="overflow-auto col-span-3 border border-gray-800 py-2 px-4">{chapter}</td>
                                        <td className="overflow-auto text-white border border-gray-800 py-2 px-4 bg-violet-500">{scores.total}</td>
                                        <td className="overflow-auto text-white border border-gray-800 py-2 px-4 bg-green-500">{scores.correct}</td>
                                        <td className="overflow-auto text-white border border-gray-800 py-2 px-4 bg-red-500">{scores.incorrect}</td>
                                        <td className="overflow-auto text-white border border-gray-800 py-2 px-4 bg-cyan-500">{scores.unattempt}</td>
                                    </div>
                                ))}
                                <p className='italic text-xs mt-1'>** T=Total, C=Correct, I=Incorrect, U=Unattempt</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </table>
        </div>
    );
}

export default TestChapterwiseScoreTable