// src/components/groups/GroupMembersTable.tsx
"use client"; // This component needs to be a client component for dialogs and actions

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, UserIcon, Trash2 } from "lucide-react";
import { TGroupDetail } from "@/lib/schema/groups.schema"; // Adjust path as needed
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast"; // Assuming you have Shadcn toast

// Define a type for a single member entry that matches what the table needs
type MemberEntry = TGroupDetail['members'][number];

type GroupMembersTableProps = {
  groupId: string; // Pass groupId to the table for actions
  members: MemberEntry[];
  onRemoveMember: (groupId: string, userId: string) => Promise<{ success: boolean; message: string }>; // Callback for removing a member
};

export const GroupMembersTable = ({ groupId, members, onRemoveMember }: GroupMembersTableProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<MemberEntry | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = (member: MemberEntry) => {
    setMemberToRemove(member);
    setIsDialogOpen(true);
  };

  const confirmRemove = async () => {
    if (!memberToRemove) return;

    setIsRemoving(true);
    try {
      const { success, message } = await onRemoveMember(groupId, memberToRemove.user.id);
      if (success) {
        toast({ title: "Member Removed", description: message });
        // Optionally, trigger a re-fetch of group data or update local state
        // For simplicity, we might just redirect or force a refresh to update the list
        router.refresh(); // Refresh the current route to refetch data
      } else {
        toast({ title: "Removal Failed", description: message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while removing the member.",
        variant: "destructive",
      });
    } finally {
      setIsRemoving(false);
      setIsDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  const handleViewClick = (userId: string) => {
    router.push(`/group/view/${groupId}/${userId}`);
  };

  return (
    <>
      {members.length === 0 ? (
        <p className="text-gray-500 italic p-4">No members in this group yet.</p>
      ) : (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead> {/* Avatar */}
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.user.id}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.user.image || "/placeholder-avatar.jpg"} alt={member.user.name || "User"} />
                    <AvatarFallback>{member.user.name ? member.user.name[0] : <UserIcon className="h-5 w-5" />}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-900">{member.user.name || "Unnamed User"}</TableCell>
                <TableCell className="text-gray-600">{member.user.email}</TableCell>
                <TableCell className="text-gray-600">
                  {new Date(member.joinedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewClick(member.user.id)}>
                        <UserIcon className="mr-2 h-4 w-4" /> View User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemoveClick(member)}
                        className="text-red-600 focus:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Confirmation Dialog for Member Removal */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove <span className="font-semibold">{memberToRemove?.user.name || "this member"}</span> from the group. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};