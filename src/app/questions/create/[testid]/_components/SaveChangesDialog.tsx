import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { updateTestQuestions } from '@/lib/actions/tests.actions'
import test from 'node:test'

type Props = {
    testId: string;
    questionIds: string[];
}

const SaveChangesDialog = (props: Props) => {

    const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

    const [isLoading, setIsLoading] = useState(false);
    const [testLink, setTestLink] = useState('');


    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const { data, message } = await updateTestQuestions(props.testId, props.questionIds);
            if (!data) {
                toast({
                    title: "Error",
                    description: message,
                    variant: "destructive",
                });
            }

            const testLink = `${baseUrl}/tests/view/${data}`;
            setTestLink(testLink);
            return toast({
                title: "Success",
                description: "Changes saved successfully!",
                variant: "success",
            });

        } catch (err) {
            return toast({
                title: "Error",
                description: "Failed to save changes",
                variant: "destructive",
            });

        } finally {
            setIsLoading(false);
        }
    };




    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    Save Changes
                </Button>
            </DialogTrigger>
            <DialogContent>

                {!testLink && <div>
                    <DialogHeader>
                        <DialogTitle>Confirm Test Creation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to finalize this test? Once created, it will be available to students.
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={handleSaveChanges}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Confirm and Create Test'}
                    </Button>
                </div>}

                {testLink && <div>
                    <DialogHeader>
                        <DialogTitle>Test Created Successfully!</DialogTitle>
                        <DialogDescription>
                            Test created successfully! Share this link:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 mt-4">
                        <Input value={testLink} readOnly className="w-full" />
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(testLink);
                                toast({
                                    title: "Copied!",
                                    description: "Test link copied to clipboard",
                                    variant: "default",
                                });
                            }}
                        >
                            Copy
                        </Button>
                    </div>
                </div>}
            </DialogContent>
        </Dialog>

    )
}

export default SaveChangesDialog