"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createCustomTestMetaData } from "@/lib/actions/tests.actions";
import { TStream } from "@/lib/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the form schema using Zod
const formSchema = z.object({
    stream: z.string().min(1, "Stream must be provided"),
    name: z.string().min(1, "Test name must be provided"),
    slug: z.string().min(1, "Slug must be provided"),
    limit: z.enum(["50", "100", "150", "200"]),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    specialUrl: z.string().optional(),
    specialImage: z.string().optional(),
    isLocked: z.boolean().default(false),
});

type Props = {
    streams: TStream[]
    gid: string | null
}

export default function CreateCustomTestForm(props: Props) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stream: props.streams[0],
            name: "",
            slug: "",
            limit: "50",
            description: "",
            imageUrl: "",
            specialUrl: "",
            specialImage: "",
            isLocked:false,
        },
    });

    const nameValue = form.watch("name");

    useEffect(() => {
        if (nameValue) {
            const slug = nameValue
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "_")
                .replace(/-+/g, "_")
                .replace(/_+/g, "_")
                .trim();
            form.setValue("slug", slug);
        }
    }, [nameValue, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast({
                title: "Creating test...",
                description: "Please wait while we create your test.",
            });

            const { data: testId, message } = await createCustomTestMetaData({
                stream: values.stream as TStream,
                name: values.name,
                slug: values.slug,
                limit: Number(values.limit),
                gid: props.gid,
                description: values.description,
                imageUrl: values.imageUrl,
                specialUrl: values.specialUrl,
                specialImage: values.specialImage,
                isLocked: values.isLocked,
            }); 

            if (!testId) {
                toast({
                    title: "Creation Failed",
                    description: message || "Failed to create test",
                    variant: "destructive"
                });
                return;
            }

            toast({
                title: "Creation Success",
                description: message || "Created Test",
                variant: "success"
            });
            toast({
                title: "Creation Success",
                description: "Redirecting soon....",
                variant: "success"
            });

            router.push(`/questions/create/${testId}`);
        } catch (error) {
            return toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg1 to-bg2 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Your Custom Test
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Fill in the details below to set up your new test.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="stream"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Stream <span className="text-red-500">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select stream" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {props.streams.map((stream) => (
                                                <SelectItem key={stream} value={stream}>
                                                    {stream}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Test Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Biology Chapter 1 Test" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Slug<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Auto-generated slug" {...field} readOnly className="bg-gray-50 cursor-not-allowed" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="limit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Number of Questions<span className="text-red-500">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select limit" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                            <SelectItem value="150">150</SelectItem>
                                            <SelectItem value="200">200</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="This test is a part of ..." {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Image URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., https://example.com/test-banner.jpg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="specialUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Special URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL to your contact like whatsapp, website" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="specialImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Special Image URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled placeholder="e.g., https://example.com/special-image.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isLocked"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Lock Test
                                        </FormLabel>
                                        <FormDescription>
                                            Toggle to make the test accessible only to users with access code
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Test"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}