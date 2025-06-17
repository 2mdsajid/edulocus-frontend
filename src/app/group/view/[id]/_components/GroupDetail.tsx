'use client'

// src/components/groups/GroupDetail.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { removeGroupMember } from "@/lib/actions/group.actions";
import { TGroupDetail } from "@/lib/schema/groups.schema";
import { useState } from 'react'; // Import useState
import { AddGroupMember } from "./AddGroupMember";
import { GroupMembersTable } from "./UserTable"; // Assuming UserTable is GroupMembersTable
import { GroupTestsTable } from "./GroupTestsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TBaseUser } from "@/lib/schema/users.schema";
import { ROLES_HIEARCHY } from "@/lib/data";

type GroupDetailProps = {
  user: TBaseUser
  group: TGroupDetail;
};

export const GroupDetail = ({ user, group }: GroupDetailProps) => {
  const [activeTab, setActiveTab] = useState<'members' | 'tests'>('members'); // State to manage active tab

  return (
    <div className="mx-auto px-4 lg:px-8">
      {/* Group Header Section */}
      <Card className="mb-8 overflow-hidden shadow-lg border-none rounded-lg bg-white">
        {group.image && (
          <div className="relative h-48 md:h-64 w-full">
            {/* Using next/image for optimized images is recommended if not already. */}
            <img
              src={group.image}
              alt={`${group.name} banner`}
              className="rounded-t-lg object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        <CardHeader className="p-6 md:p-8">
          <CardTitle className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {group.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Created by <span className="font-semibold text-purple-600">{group.creatorName}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0">
          {group.description && (
            <>
              <p className="text-gray-700 text-lg mb-6">{group.description}</p>
              <Separator className="my-6" />
            </>
          )}

          {/* this will restrict roles in group page */}
          {ROLES_HIEARCHY.MODERATOR.includes(user.role)
            && <div className="mb-4">
              <AddGroupMember
                groupId={group.id}
              />
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white ml-2"
                asChild
              >
                <a target="_blank" href={`/questions/create?gid=${group.id}`}>
                  <Plus className="mr-2 h-4 w-4" /> Add Test
                </a>
              </Button>
            </div>}

          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-medium mr-2">Slug:</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-mono">
              {group.slug}
            </span>
          </div>
        </CardContent>
      </Card>

      {ROLES_HIEARCHY.MODERATOR.includes(user.role) ? (
        /* Group Members and Tests Section */
        <Card className="shadow-lg rounded-lg border-none">
          <CardHeader className="p-6 md:p-8 pb-0">
            <div className="flex border-b border-gray-200">
              <button
                className={`pb-3 px-4 text-lg font-semibold ${activeTab === 'members'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setActiveTab('members')}
              >
                Members ({group.members.length})
              </button>
              <button
                className={`pb-3 px-4 text-lg font-semibold ${activeTab === 'tests'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setActiveTab('tests')}
              >
                Tests ({group.customTests.length})
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {activeTab === 'members' ? (
              <GroupMembersTable
                groupId={group.id}
                members={group.members}
                onRemoveMember={removeGroupMember}
              />
            ) : (
              <GroupTestsTable
                user={user}
                groupId={group.id}
                tests={group.customTests}
              />
            )}
          </CardContent>
        </Card>
      ) : (
        /* Tests Only Section for Non-Moderators */
        <Card className="shadow-lg rounded-lg border-none">
          <CardHeader className="p-6 md:p-8">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Tests ({group.customTests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <GroupTestsTable
              user={user}
              groupId={group.id}
              tests={group.customTests}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};