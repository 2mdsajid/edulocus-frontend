'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createSubscriptionRequest } from './actions'
import { Loader2 } from "lucide-react"


const formSchema = z.object({
    name: z.string().min(2, { message: "First name must have at least 2 characters" }),
    email: z.string().email({
        message: "Email not formatted",
    }),
    phone: z.string()
        .refine(value => /^\d{10,}$/g.test(value), {
            message: "Invalid phone number. It must have at least 10 digits."
        }),
});


type Props = {}

const SubscriptionForm = (props: Props) => {

    const [isSubmitClicked, setIsSubmitClicked] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitClicked(true)
        const { data, message } = await createSubscriptionRequest({
            name: values.name,
            email: values.email,
            phone: values.phone
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
                <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
                <CardDescription className="text-center">Enter your details to get in touch</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className="mb-0" placeholder="Your name" {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input className="mb-0" placeholder="+977982344****" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isSubmitClicked}>
                            {isSubmitClicked ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
                We&apos;ll never share your details. Read our <a href="#" className="underline">Privacy Policy</a>.
            </CardFooter>
        </Card>
    )
}

export default SubscriptionForm