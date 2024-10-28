import React from 'react'
import { Dialog, dialogCloseFunction, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MdDelete } from 'react-icons/md';
import { Button } from '@/components/ui/button';


type Props = {
    index: number
    onClick: (index: number) => void
}

const DeleteQuestionButton = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-max text-xl">
                    <MdDelete />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure want to DELETE this question?</DialogTitle>
                <div className="flex gap-2">
                    <Button
                        className='w-fit'
                        variant="destructive"
                        onClick={() => {
                            props.onClick(props.index)
                            dialogCloseFunction()
                        }}>
                        Delete
                    </Button>
                    <Button
                        className='w-fit'
                        variant="default"
                        onClick={() => {
                            dialogCloseFunction()
                        }}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteQuestionButton