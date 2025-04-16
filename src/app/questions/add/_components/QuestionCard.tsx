import DropDownInput from '@/components/reusable/DropDownInput';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DeleteQuestionButton from './DeleteQuestionButton';
import { TExpectedQuestionFormatFromFile } from '@/lib/schema/questions.schema';

type QuestionCardProps = {
    question: TExpectedQuestionFormatFromFile;
    index: number;
    editQuestion: (value: string, field: string, index: number) => void;
    handleDeleteQuestion: (index: number) => void;
};

const QuestionCard = ({
    question,
    index,
    editQuestion,
    handleDeleteQuestion,
}: QuestionCardProps) => {
    return (
        <Card className="px-3 py-5 relative bg-accent3 dark:bg-dark-accent3">
            <div>
                <Label htmlFor="question" className="absolute top-[0.2rem] left-5 flex gap-2 dark:bg-gray-800 text-xs">
                    {index} )
                    {(question.chapter || question.subject) && (
                        <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
                            {question.subject && <p><span className="font-semibold">Subject:</span> {question.subject}</p>}
                            {question.chapter && <p><span className="font-semibold">Chapter:</span> {question.chapter}</p>}
                        </div>
                    )}
                </Label>
                <div className="w-full flex flex-col gap-4 text-sm">
                    <div className="w-full">
                        <Textarea
                            className="h-21 text-xs"
                            value={question.qn}
                            onChange={(e) => editQuestion(e.target.value, 'qn', index)}
                            placeholder="Type your question here."
                            id="question"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {['a', 'b', 'c', 'd'].map((opt) => (
                            <div key={opt} className="w-full grid gap-2">
                                <Textarea
                                    rows={1}
                                    className="text-xs h-21"
                                    value={question.options[opt as keyof typeof question.options]}
                                    onChange={(e) => editQuestion(e.target.value, opt, index)}
                                    placeholder={`Type your Option ${opt.toUpperCase()} here.`}
                                    id={opt}
                                />
                            </div>
                        ))}
                    </div>
                    <DropDownInput
                        category="answer"
                        value={question.ans}
                        className="mb-0"
                        dropdownMenu={['a', 'b', 'c', 'd']}
                        onChange={(value: string) => editQuestion(value, 'ans', index)}
                    />

                    <div className="w-full grid gap-2">
                        <Textarea
                            rows={1}
                            className="text-xs h-21"
                            value={question.exp}
                            onChange={(e) => editQuestion(e.target.value, 'exp', index)}
                            placeholder="Type the explanation here."
                            id="explanation"
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-5">
                <DeleteQuestionButton
                    index={index}
                    onClick={handleDeleteQuestion}
                />
            </div>
        </Card>
    );
}


export default QuestionCard
