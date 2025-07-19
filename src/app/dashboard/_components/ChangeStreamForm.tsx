'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { changeStream } from "@/lib/actions/users.actions";
import { TStream } from "@/lib/schema/users.schema";
import { Loader2, ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

type Props = {
    currentStream: TStream;
};

const ChangeStreamForm = ({ currentStream }: Props) => {

    const router = useRouter()

    const [selectedStream, setSelectedStream] = useState<TStream>(currentStream);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            const {data, message} = await changeStream(selectedStream);

            if (data) {
                toast({
                    variant: 'success',
                    title: 'Success!',
                    description: message,
                });
                router.refresh()
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: message,
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasChanged = selectedStream !== currentStream;

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 mb-4">
                    <ArrowRightLeft className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Change Stream</CardTitle>
                <CardDescription>
                    WARNING: Changing stream will revoke your membership
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="rounded-lg border bg-slate-50 p-3 text-center dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Your Current Stream</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-50">{currentStream}</p>
                </div>
                <div>
                    <label htmlFor="new-stream" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select New Stream
                    </label>
                    <Select onValueChange={(value) => setSelectedStream(value as TStream)} defaultValue={selectedStream}>
                        <SelectTrigger id="new-stream" className="w-full py-6 text-base">
                            <SelectValue placeholder="Select a new stream" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                            <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleSave}
                    disabled={!hasChanged || isSubmitting}
                    className="w-full py-6 text-base font-semibold"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ChangeStreamForm;