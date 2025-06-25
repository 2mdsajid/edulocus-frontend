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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast'
import { createSubscriptionRequest } from '@/lib/actions/users.actions'
import { STREAM_DETAILS } from "@/lib/data"
import { TBaseUser, TStream } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
  // Removed name, email from the schema as they are not input fields anymore
  phone: z.string()
    .refine(value => /^\d{10,}$/g.test(value), {
      message: "Invalid phone number. It must have at least 10 digits."
    }),
});


type Props = {
  user: TBaseUser
}

const SubscriptionForm = (props: Props) => {
  const { user } = props
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Keep these default values as they will still be sent in the action
      // They are just not rendered as input fields
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitClicked(true)
    const { data, message } = await createSubscriptionRequest({
      // Still send name and email from the user object
      name: user.name,
      email: user.email,
      phone: values.phone,
      stream: user.stream,
    } as any) // Type assertion due to 'name' and 'email' not being in formSchema

    if (!data || data === undefined || data === null) {
      toast({
        variant: "destructive",
        title: "Warning",
        description: message,
      })
      return setIsSubmitClicked(false)
    }

    setIsSubmitClicked(false)
    form.reset({
      phone: "",
    });
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
          Fill the form below and submit
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Removed FormField for 'name' and 'email' */}

              {/* <FormField
                control={form.control}
                name="stream"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Stream</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300">
                          <SelectValue placeholder="Select your stream" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                        <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-zinc-600 mb-0">
                      Membership Fee: Rs {STREAM_DETAILS[form.watch('stream').toLowerCase() as keyof typeof STREAM_DETAILS].price} [ {STREAM_DETAILS[form.watch('stream').toLowerCase() as keyof typeof STREAM_DETAILS].desc} ]
                    </p>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              /> */}

              <div className="flex flex-col items-center justify-center">
                {/* <div className="relative w-48 h-48">
                  <img
                    src="/qr.png"
                    alt="Payment QR Code"
                  />
                </div> */}
                <p className="text-center ">
                  Membership fee for {user.stream} is Rs {STREAM_DETAILS[user.stream.toLowerCase() as keyof typeof STREAM_DETAILS].price}.
                </p>
                <p className="text-center text-zinc-600 text-sm">
                  [{STREAM_DETAILS[user.stream.toLowerCase() as keyof typeof STREAM_DETAILS].desc}]
                </p>
              </div>

              {/* <FormField
                control={form.control}
                name="paymentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Payment Transaction Number</FormLabel>
                    <FormControl>
                      <Input
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                        placeholder="Enter the transaction ID or number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Phone Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-zinc-300"
                        placeholder="9845999999"
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
        <CardFooter className="flex flex-col items-center text-center text-sm text-zinc-600 border-t border-zinc-200 pt-6 space-y-3">
          
          <p className="text-sm font-semibold text-zinc-800">
            Please provide your correct phone number. Within 24 hours, we&apos;ll contact you.
          </p>
          {/* <p className="text-sm text-zinc-800">
            <span className="font-bold">5-day refund policy</span> applies from the date of payment.
          </p> */}
          <div className="mt-4 text-center">
            <p className="font-medium text-zinc-800">For Support or Contact :</p>
            <p>
              Facebook:{' '}
              <a href="https://www.facebook.com/edu.locus" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                edu.locus
              </a>
            </p>
            <p>
              Telegram Chat:{' '}
              <a href="https://t.me/+ygNs2o0PLXpjNDQ1" className="text-zinc-900 hover:text-zinc-700 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
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
  )
}

export default SubscriptionForm