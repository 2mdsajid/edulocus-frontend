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
import { STREAM_DETAILS } from "@/lib/data" // Make sure this is imported
import { TBaseUser } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Loader2, ScanLine, Send, UploadCloud } from "lucide-react"
import Image from "next/image"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createSubscriptionRequest } from "@/lib/actions/users.actions"
import ImageUploaderComponent from "@/components/uploadthing/ImageUploaderComponent"

const formSchema = z.object({
    phone: z.string()
        .refine(value => /^\d{10,}$/g.test(value), {
            message: "A valid 10-digit phone number is required."
        }),
});

type Props = {
    user: TBaseUser
}

// --- Reusable Support Footer ---
const SupportFooter = () => (
    <CardFooter className="flex flex-col items-center border-t border-zinc-200 p-6 text-center text-sm text-zinc-600">
        <a href="/membership/trial" className="font-semibold mb-3">
            Get Your Free Trial - <span className="text-purple-700 hover:text-purple-800 underline underline-offset-4">Click Here</span>
        </a>
        <p className="font-medium text-zinc-800">For Support or Inquiries:</p>
        <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/edu.locus" className="font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                Facebook
            </a> .
            <a href="mailto:edulocusweb@gmail.com" className="font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4">
                edulocusweb@gmail.com
            </a>
        </div>
        <div className="mt-4">
            <a href="/feedback" target="_blank" className="font-semibold ">
                Don&apos;t want to pay? <span className="text-purple-700 hover:text-purple-800 underline underline-offset-4">Contact us here</span>
            </a>
        </div>
    </CardFooter>
);


const FullSubscriptionForm = (props: Props) => {
    const { user } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { phone: "" },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (uploadedImages.length === 0) {
            toast({
                variant: "destructive",
                title: "Image Required",
                description: "Please upload your payment receipt screenshot before submitting.",
            });
            return;
        }

        setIsSubmitting(true);

        // --- MOCK API CALL ---
        const { data, message } = await createSubscriptionRequest({
            name: user.name,
            email: user.email,
            phone: values.phone,
            transactionImage: uploadedImages[0],
        });

        setIsSubmitting(false);

        if (!data) {
            toast({ variant: "destructive", title: "Submission Failed", description: "Something went wrong." });
        } else {
            setIsSuccess(true);
        }
    }

    // --- Success State Card ---
    if (isSuccess) {
        return (
            <div className="flex items-center justify-center p-4">
                <Card className="w-full max-w-lg text-center bg-white shadow-2xl shadow-green-900/10 ring-1 ring-green-200">
                    <CardHeader className="items-center p-6">
                        <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                            Submission Received!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* --- UPDATED SUCCESS MESSAGE --- */}
                        <p className="text-lg text-zinc-700">
                            Thank you for your support to EduLocus. We&apos;ll soon activate your membership.
                        </p>
                    </CardContent>
                    <SupportFooter />
                </Card>
            </div>
        );
    }

    // --- Main 3-Step Form Card ---
    return (
        <div className="flex items-center justify-center p-4 pb-32">
            <Card className="w-full max-w-lg bg-white shadow-2xl shadow-zinc-900/10 ring-1 ring-gray-100">
                <CardHeader className="p-6 text-center border-b border-zinc-200">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Complete Your Membership
                    </CardTitle>
                    {/* <CardDescription className="text-zinc-600">
                        Follow the 3 steps below to activate your full membership.
                    </CardDescription> */}

                    {/* --- ADDED PRICING DETAILS --- */}
                    <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 py-2 px-4">
                        <p className="text-center font-semibold text-gray-800">
                            Membership fee for {user.stream} is Rs {STREAM_DETAILS[user.stream.toLowerCase() as keyof typeof STREAM_DETAILS].price} {STREAM_DETAILS[user.stream.toLowerCase() as keyof typeof STREAM_DETAILS].duration}.
                        </p>
                        <p className="text-center text-zinc-600 text-sm">
                            [{STREAM_DETAILS[user.stream.toLowerCase() as keyof typeof STREAM_DETAILS].desc}]
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* === STEP 1: MAKE PAYMENT === */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">1</div>
                            <h3 className="text-xl font-semibold text-gray-800">Make Payment</h3>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border border-zinc-200 p-4 bg-slate-50">
                            <Image src="/qr.png" alt="Payment QR Code" width={200} height={200} className="rounded-md" />
                            <p className="mt-4 text-center text-sm text-zinc-700">
                                Scan the QR code to pay. Please mention your email <strong className="text-purple-700">({user.email})</strong> in the payment remarks/notes.
                            </p>
                        </div>
                    </div>

                    {/* === STEP 2: UPLOAD RECEIPT === */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">2</div>
                            <h3 className="text-xl font-semibold text-gray-800">Upload Receipt</h3>
                        </div>
                        <div className="rounded-lg border border-zinc-200 p-4 bg-slate-50">
                            <p className="text-center text-sm text-zinc-700 mb-4">
                                After payment, upload the transaction screenshot here.
                            </p>
                            {uploadedImages.length > 0 ? (
                                <div className="space-y-4">
                                    <img
                                        src={uploadedImages[0]}
                                        alt="Uploaded Receipt"
                                        className="w-full rounded-md border border-zinc-200"
                                    />
                                    <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>Receipt Uploaded Successfully!</span>
                                    </div>
                                </div>
                            ) : (
                                <ImageUploaderComponent images={uploadedImages} SetImages={setUploadedImages} />
                            )}
                        </div>
                    </div>

                    {/* === STEP 3: SUBMIT INFO === */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">3</div>
                            <h3 className="text-xl font-semibold text-gray-800">Submit Your Details</h3>
                        </div>
                        <div className="rounded-lg border border-zinc-200 p-4 bg-slate-50">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-zinc-800">Contact Phone Number <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="py-6 border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-purple-400 focus:ring-purple-400"
                                                        placeholder="e.g., 9845999999"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="submit"
                                        disabled={isSubmitting || uploadedImages.length === 0}
                                    >
                                        {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                        {isSubmitting ? 'Submitting...' : 'Complete Membership'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </CardContent>
                <SupportFooter />
            </Card>
        </div>
    );
}

export default FullSubscriptionForm