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
import { createUserFeedback } from "@/lib/actions/users.actions"
import Link from "next/link"
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { Mail } from "lucide-react"


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

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
        form.reset(); // Reset form fields after successful submission
        return toast({
            variant: "success",
            title: "Received",
            description: message,
        })

    }

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-color8">Feedback / Contact</CardTitle>
                <CardDescription className="text-center">Have a question or feedback? Drop us a line!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-gray-700">Name</FormLabel>
                                    <FormControl>
                                        <Input className='dark:bg-black rounded-md dark:text-white' placeholder="Your Name" {...field} />
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
                                    <FormLabel className="text-gray-700">Email</FormLabel>
                                    <FormControl className='rounded-md'>
                                        <Input className='dark:bg-black rounded-md dark:text-white' placeholder="your.email@example.com" {...field} />
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
                                    <FormLabel className="text-gray-700">Message</FormLabel>
                                    <FormControl>
                                        <Textarea className='dark:bg-black rounded-md dark:text-white' placeholder="Your message, feedback, or question..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <SubmitButton className='w-full bg-color8 hover:bg-color5 font-bold' initialstate='Submit Feedback' loadingstate='Submitting...' isLoadingState={issubmitclicked} />
                    </form>
                </Form>
            </CardContent>
            {/* --- UPDATED CARD FOOTER WITH CONTACT LINKS --- */}
            <CardFooter className="flex flex-col items-center text-sm text-muted-foreground gap-4">
                <div className="text-center">
                    <p className="font-medium text-zinc-700">Or contact us directly via:</p>
                    <div className="flex justify-center gap-5 mt-3">
                        <Link href="https://www.facebook.com/edu.locus" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-blue-600 transition-colors">
                            <FaFacebookF className="h-6 w-6" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="https://wa.me/9779763249052" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-green-600 transition-colors">
                            <FaWhatsapp className="h-6 w-6" />
                             <span className="sr-only">WhatsApp</span>
                        </Link>
                        <Link href="mailto:edulocusweb@gmail.com" className="text-zinc-600 hover:text-red-600 transition-colors">
                            <Mail className="h-6 w-6" />
                             <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
                <div className="border-t border-zinc-200 w-full my-2"></div>
                <p>
                    We&apos;ll never share your details. Read our &nbsp;
                    <Link href="/privacy" className="underline hover:text-purple-700">Privacy Policy</Link>.
                </p>
            </CardFooter>
        </Card>
    )
}

export default FeedbackForm
