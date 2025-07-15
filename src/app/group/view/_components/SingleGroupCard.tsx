// components/group-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TGroupBase } from "@/lib/schema/groups.schema"; 

interface SingleGroupCardProps {
  id:string
  name:string
}

export function SingleGroupCard({ id , name}: SingleGroupCardProps) {
  const groupLink = `/group/view/${id}`; 

  return (
    <Link href={groupLink} className="w-full ">
      <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out h-full flex flex-col p-5">
        {/* <CardHeader className="space-y-1">
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
        </CardContent> */}
        <h1 className="text-3xl font-bold my-4 center">{name}</h1>
        <CardFooter>
          <Link href={groupLink} className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </Link>
        </CardFooter>

      </Card>
    </Link>
  );
}