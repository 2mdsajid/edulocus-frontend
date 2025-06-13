"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { groupCreateSchema, TGroupCreate } from "@/lib/schema/groups.schema";
import { toast } from "@/hooks/use-toast";
import { createGroupAction } from "@/lib/actions/group.actions";
import { useState } from "react"; // Import useState for managing loading state
import { Loader2 } from "lucide-react"; // Import Loader2 icon for spinner


export function CreateGroupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

  const form = useForm<TGroupCreate>({
    resolver: zodResolver(groupCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      image:"someurl",
    },
  });

  async function onSubmit(groupData: TGroupCreate) {
    console.log(form.formState.errors)
    setIsSubmitting(true); // Set loading to true when submission starts
    try {
      const { data, message } = await createGroupAction(groupData);

      if (data) {
        toast({
          title: "Group Created Successfully!",
          description: message || "Your group has been created.",
        });
        form.reset();
      } else {
        toast({
          title: "Group Creation Failed",
          description: message || "An error occurred during group creation.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Always set loading to false when submission finishes (success or error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter group name" {...field} disabled={isSubmitting} />
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
                <Input placeholder="Enter unique slug (e.g., my-awesome-group)" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about your group (optional)"
                  className="resize-y min-h-[100px]"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isSubmitting} // Disable textarea during submission
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          disabled={isSubmitting} // Disable button during submission
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {/* Spinner when loading */}
          {isSubmitting ? "Creating " : "Create Group"} {/* Change text when loading */}
        </Button>
      </form>
    </Form>
  );
}