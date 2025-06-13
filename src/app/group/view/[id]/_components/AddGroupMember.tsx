// src/components/groups/AddGroupMember.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // Assuming your toast hook path
import { addGroupMemberAction } from "@/lib/actions/group.actions";
import { TAddMember, addMemberSchema } from "@/lib/schema/groups.schema";
import { Loader2, UserPlus } from "lucide-react"; // UserPlus icon for the trigger button
import { useRouter } from "next/navigation";

// Zod schema for the email input

type AddGroupMemberProps = {
    groupId: string;
};

export const AddGroupMember = ({ groupId }: AddGroupMemberProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TAddMember>({
        resolver: zodResolver(addMemberSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (addGroupMemberData: TAddMember) => {
        setIsSubmitting(true);
        try {
            const { data, message } = await addGroupMemberAction(groupId, addGroupMemberData.email);

            if (!data) {
                return toast({
                    title: "Member Not Added",
                    variant: "destructive",
                    description: message,
                });
            } else {
                 toast({
                    title: "Added Member",
                    description: message,
                });
                form.reset();
                setOpen(false); 
                router.refresh()
                return
            }

        } catch (error) {
            console.error("Error adding group member:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                    <DialogDescription>
                        Enter the email address of the user you want to add to this group.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="user@example.com"
                                            {...field}
                                            type="email" // Use type="email" for better mobile keyboard
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Adding Member..." : "Add Member"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};