// components/group-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TGroupBase } from "@/lib/schema/groups.schema"; 

interface SingleGroupCardProps {
  group: TGroupBase ; 
}

export function SingleGroupCard({ group }: SingleGroupCardProps) {
  const groupLink = `/group/view/${group.id}`; 

  return (
    <Link href={groupLink} className="w-full ">
      <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out h-full flex flex-col">
        <CardHeader className="space-y-1">
          {group.image && (
            <div className="relative w-full h-24">
              <img
                src={group.image}
                alt={group.name}
                className="rounded-md"
              />
            </div>
          )}
          <CardTitle className="text-lg">{group.name}</CardTitle>
          <CardDescription className="text-sm">Slug: {group.slug}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {group.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {group.description}
            </p>
          )}
          {group.creatorName && (
            <p className="text-sm">Admin: {group.creatorName}</p>
          )}
        </CardContent>

      </Card>
    </Link>
  );
}