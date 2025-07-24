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
import { createTrialRequest } from '@/lib/actions/users.actions'
import { TBaseUser } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Gift, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  phone: z.string()
    .refine(value => /^\d{10,}$/g.test(value), {
      message: "A valid 10-digit phone number is required."
    }),
});

type Props = {
  user: TBaseUser
}

const CreateTrialForm = (props: Props) => {
  const { user } = props
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const { data, message } = await createTrialRequest({
      name: user.name,
      email: user.email,
      phone: values.phone,
    })

    if (!data) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: message,
      })
      return setIsSubmitting(false)
    }

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // --- Success State Card ---
  if (isSuccess) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white shadow-2xl shadow-green-900/10 ring-1 ring-green-200">
          <CardHeader className="items-center p-6">
            <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Trial Activated!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-zinc-700">
              <span className="capitalize">{user.name}</span>, enjoy exclusive membership features on EduLocus for <span className="font-bold">5 days</span>.
            </p>
          </CardContent>
          <CardFooter className="p-6">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="/tests">Explore Tests</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // --- Initial Form Card ---
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-white to-slate-50 shadow-2xl shadow-zinc-900/10 ring-1 ring-gray-100">
        <CardHeader className="items-center space-y-2 border-b border-zinc-200 p-6 text-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Gift className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Claim Your Free Trial, {user.name}!
          </CardTitle>
          <CardDescription className="text-zinc-600">
            Get free access to all membership features for 5 days.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-800">Phone Number <span className="text-red-500">*</span></FormLabel>
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
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Get Free Trial'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        {/* --- UPDATED CARD FOOTER --- */}
        <CardFooter className="flex flex-col items-center border-t border-zinc-200 p-6 text-center text-sm text-zinc-600">
          <a href="/membership/register" className="font-semibold mb-3">
            Want full access? <span className="text-purple-700 hover:text-purple-800 underline underline-offset-4">Apply for Membership</span>
          </a>
          <p className="font-medium text-zinc-800">For Support or Inquiries:</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-2">
            <a href="https://www.facebook.com/edu.locus" className="font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <span className="text-zinc-400">•</span>
            <a href="https://wa.me/9779763249052" className="font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <span className="text-zinc-400">•</span>
            <a href="mailto:edulocusweb@gmail.com" className="font-semibold text-purple-700 hover:text-purple-800 underline underline-offset-4">
              Email
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateTrialForm
