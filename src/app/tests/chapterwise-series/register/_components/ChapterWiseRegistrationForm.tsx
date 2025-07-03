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
import { Textarea } from '@/components/ui/textarea' // Assuming you'll need a textarea for the message field
import { toast } from '@/hooks/use-toast' // Assuming you have a toast notification system
import { registerForChapterwiseTest } from "@/lib/actions/users.actions"
import { TBaseUser } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

// Your provided schema
export const ChapterwiseRegistrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
    message: z.string().optional(), // Make message optional as it's not always required
});

type ChapterwiseRegistrationFormValues = z.infer<typeof ChapterwiseRegistrationSchema>;

interface ChapterwiseRegistrationFormProps {
    user?: TBaseUser
}

const ChapterwiseRegistrationForm = (props: ChapterwiseRegistrationFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = props

    const form = useForm<ChapterwiseRegistrationFormValues>({
        resolver: zodResolver(ChapterwiseRegistrationSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: "",
            message: "",
        },
    });

    async function onSubmit(values: ChapterwiseRegistrationFormValues) {
        setIsSubmitting(true);
        try {

            const { data, message } = await registerForChapterwiseTest(values)
            if (!data) {
                setIsSubmitting(false)
                return toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: message || "An unexpected error occurred. Please try again.",
                });

            }

            toast({
                variant: "success",
                title: "Registration Successful",
                description: "Registration Complete!",
            });
            form.reset(); // Reset the form after successful submission
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error.message || "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">
                <CardHeader className="space-y-1 border-b border-zinc-200 pb-6">
                    <CardTitle className="text-2xl font-bold text-center text-[#7C3AED]"> {/* Using a placeholder color similar to your theme's color7 */}
                        Chapterwise Registration
                    </CardTitle>
                    <CardDescription className="text-center text-zinc-600">
                        Register below to get started with chapterwise content.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-800">Full Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-800">Email Address <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                type="email"
                                                className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                                                placeholder="you@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-800">Phone Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                                                placeholder="98XXXXXXXX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-800">Your difficult chapter (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="min-h-[80px] border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                                                placeholder="Anything else you'd like us to know?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-colors" // Using placeholder colors
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting
                                    </>
                                ) : (
                                    'Register Now'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center text-center text-sm text-zinc-600 border-t border-zinc-200 pt-3 space-y-3">

                    <div className=" text-center">
                        <p>
                            About this series:{' '}
                            <a href="https://edulocusweb.com/tests/chapterwise-series/info" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                                click here
                            </a>
                        </p>
                        <p>
                            Telegram Chat:{' '}
                            <a href="https://t.me/edulocus_tg" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                                Join our Telegram group
                            </a>
                        </p>
                    </div>
                    <p>
                        <a href="/privacy" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4">
                            Privacy Policy
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ChapterwiseRegistrationForm;