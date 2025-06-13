"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            limit: "50", // Default limit
        },
    });

    // Watch the `name` field and generate the slug
    const nameValue = form.watch("name");

    useEffect(() => {
        if (nameValue) {
            // Generate slug from name
            const slug = nameValue
                .toLowerCase() // Convert to lowercase
                .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
                .replace(/\s+/g, "_") // Replace spaces with underscores
                .replace(/-+/g, "_") // Replace hyphens with underscores
                .replace(/_+/g, "_") // Replace multiple underscores with a single underscore
                .trim(); // Remove leading/trailing spaces

            // Set the slug value in the form
            form.setValue("slug", slug);
        }
    }, [nameValue, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Show loading toast
            toast({
                title: "Creating test...",
                description: "Please wait while we create your test.",
            });

            // Create test and get response
            const { data: testId, message } = await createCustomTestMetaData({
                stream: values.stream as TStream,
                name: values.name,
                slug: values.slug,
                limit: Number(values.limit),
                gid: props.gid
            });

            if (!testId) {
                toast({
                    title: "Creation Failed",
                    description: message || "Failed to create test",
                    variant: "destructive"
                });
            }

            toast({
                title: "Creation Success",
                description: message || "Created Test",
                variant: "success"
            });

            // Redirect to create questions page with test ID
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="stream"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stream</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
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
                            <FormLabel>Test Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter test name" {...field} />
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
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="Slug will be generated automatically" {...field} readOnly />
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
                            <FormLabel>Number of Questions</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
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

                <Button type="submit" disabled={form.formState.isSubmitting}>
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
    );
}