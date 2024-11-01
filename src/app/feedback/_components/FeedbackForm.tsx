'use client'

import SubmitButton from "@/components/reusable/SubmitButton"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createUserFeedback } from "./actions"

type ResponseType = {
    fileKey: string;
    fileUrl: string;
}

const formSchema = z.object({
    name: z.string().min(2, { message: "First name must have at least 2 characters" }),
    email: z.string().email({
        message: "Email not formatted",
    }),
    message: z.string().max(300, { message: "Message can't be more than 300 characters" }),
})

const FeedbackForm = () => {
    const [issubmitclicked, setIsSubmitClicked] = useState(false)
    const [image, setImage] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    // const handleCompleteUpload = (response: TUploadThingResponseData[]) => {
    //     const imgurl = response[0].url
    //     setImage(imgurl)
    //     return toast({
    //         variant: "success",
    //         title: "Success",
    //         description: 'Image uploaded. You can submit now!',
    //     });
    // };
    // const handleUploadError = (error: any) => {
    //     return toast({
    //         variant: "destructive",
    //         title: "Warning",
    //         description: error.message,
    //     });
    // };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitClicked(true)

        setIsSubmitClicked(true)
        const { data, message } = await createUserFeedback({
            name: values.name,
            email: values.email,
            message: values.message
        })

        if (!data || data === undefined || data === null) {
            toast({
                variant: "destructive",
                title: "Warning",
                description: message,
            })
            return setIsSubmitClicked(false)
        }

        setIsSubmitClicked(false)
        return toast({
            variant: "success",
            title: "Received",
            description: message,
        })

    }

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-color7">Feedback / Contact</CardTitle>
                <CardDescription className="text-center">Enter your details to get in touch</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-color7">Name</FormLabel>
                                    <FormControl>
                                        <Input className='dark:bg-black rounded-md dark:text-white' placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-color7">Email</FormLabel>
                                    <FormControl className='rounded-md'>
                                        <Input className='dark:bg-black rounded-md dark:text-white' placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-color7">Message</FormLabel>
                                    <FormControl>
                                        <Textarea className='dark:bg-black rounded-md dark:text-white' placeholder="Your Message..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <div>
                        <FormLabel className="text-color7">Upload the screenshot of any issues (optional)</FormLabel>
                        <ImageUploadButton
                            onImageUploadComplete={(value: TUploadThingResponseData[]) => handleCompleteUpload(value)}
                            onImageUploadError={handleUploadError}
                        />
                    </div> */}

                        <SubmitButton className='bg-color6 hover:bg-color8' initialstate='Submit' loadingstate='Submitting' isLoadingState={issubmitclicked} />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
                We&apos;ll never share your details. Read our &nbsp;<a href="/privacy" className="underline">Privacy Policy</a>.
            </CardFooter>
        </Card>
    )
}

export default FeedbackForm
