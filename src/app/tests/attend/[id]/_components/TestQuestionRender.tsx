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
    const { question, index, getInput } = props;
    return (
      <div className="question mb-6 p-4 shadow-md dark:border dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg">
        <div className="flex gap-4 justify-between items-start w-full mb-4">
          <div className="qn text-md flex items-start text-lg font-semibold text-gray-800 dark:text-gray-200">
            <p>{ParsedElement(`Q.${index + 1}&nbsp;&nbsp;  ${question.question}`)}</p>
          </div>
        </div>
  
        <RadioGroup
          onValueChange={(value) => getInput(value, question.id)}
          className="flex flex-col gap-3 w-full"
        >
          {['a', 'b', 'c', 'd'].map((option) => (
            <div
              key={option}
              className="flex items-center w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 has-[:checked]:border-blue-500 has-[:checked]:dark:border-blue-500 has-[:checked]:dark:bg-blue-800 has-[:checked]:bg-blue-200"
            >
              <RadioGroupItem
                value={`${option}`}
                id={`${question.id}_${option}`}
                className="hidden"
              />
              <Label
                htmlFor={`${question.id}_${option}`}
                className="w-full flex items-center cursor-pointer p-2 pl-0 text-md text-gray-700 dark:text-gray-300"
              >
                <div className="flex gap-3 items-center">
                  <p className="flex gap-1 font-semibold text-gray-800 dark:text-gray-200">
                    {option} <span>)</span>
                  </p>
                  <p>{ParsedElement(question.options[option as keyof TBaseOption])}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };
  
  export default TestQuestionRender;
  