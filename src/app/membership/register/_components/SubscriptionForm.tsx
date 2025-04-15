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
import { createSubscriptionRequest } from '@/lib/actions/users.actions'
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
        <div className="flex items-center justify-center p-4">
  <Card className="w-full max-w-md border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">
    <CardHeader className="space-y-1 border-b border-zinc-200 pb-6">
      <CardTitle className="text-2xl font-bold text-center text-color7">
        Membership Form
      </CardTitle>
      <CardDescription className="text-center text-zinc-600">
        Enter your details and we&apos;ll get in touch soon.
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
                <FormLabel className="text-zinc-800">Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                    placeholder="Your name"
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
                <FormLabel className="text-zinc-800">Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                    placeholder="example@gmail.com"
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
                <FormLabel className="text-zinc-800">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                    placeholder="+1 (555) 000-0000"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-color7 hover:bg-color5 text-white transition-colors"
            type="submit"
            disabled={isSubmitClicked}
          >
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
    <CardFooter className="text-center text-sm text-zinc-600 border-t border-zinc-200 pt-6">
      We&apos;ll never share your details. Read our{' '}
      <a href="/privacy" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4">
        Privacy Policy
      </a>
      .
    </CardFooter>
  </Card>
</div>
    )
}

export default SubscriptionForm