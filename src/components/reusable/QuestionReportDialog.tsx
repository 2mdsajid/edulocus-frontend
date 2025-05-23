import React, { useState } from 'react'
import { Dialog, dialogCloseFunction, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog'
import { reportQuestion } from '@/lib/actions/questions.actions'
import { toast } from '@/hooks/use-toast'


type Props = {
    questionId: string
}

const QuestionReportDialog = (props: Props) => {
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleReportButtonClick = async () => {
        setIsLoading(true)
        const {data, message} = await reportQuestion(props.questionId, description)
        if(!data) {
            setIsLoading(false)
            return toast({
                title: "Error",
                description: message,
                variant: "destructive"
            })
        }
        dialogCloseFunction()
        setDescription('')
        setIsLoading(false)
        return toast({
            title: "Success",
            description: message,
            variant: "default"
        })
    }
  return (
    <Dialog>
          <DialogTrigger asChild>
            <button className="flex gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <span className='text-xs'>Report</span>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" x2="4" y1="22" y2="15"/>
              </svg> */}

            </button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Report Question</h3>
              <textarea 
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                placeholder="Describe the issue with this question..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReportButtonClick}
                disabled={isLoading}
              >
                {isLoading ? 'Reporting...' : 'Report Question'}
              </button>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default QuestionReportDialog