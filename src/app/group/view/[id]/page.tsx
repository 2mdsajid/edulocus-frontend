// src/app/groups/[id]/page.tsx (or wherever your dynamic route is)
import ErrorPage from "@/components/reusable/ErrorPage";
import { getGroupById } from "@/lib/actions/group.actions"; // Your action to fetch group data
import { GroupDetail } from "./_components/GroupDetail"; // Import the new component
import { constructMetadata } from "@/lib/data"; // Assuming you have this utility for metadata

type Props = {
  params: {
    id: string;
  };
};

// Optional: Dynamic metadata for the page based on group name
export async function generateMetadata({ params }: Props) {
    const { data: groupData } = await getGroupById(params.id);

    if (groupData) {
        return constructMetadata({
            title: `EduLocus | Group: ${groupData.name}`,
            description: groupData.description || `Details for the group "${groupData.name}".`,
        });
    }

    return constructMetadata({
        title: 'EduLocus | Group',
        description: 'A Place to add and organize tests, members.',
    });
}


const page = async ({ params }: Props) => {
  const id = params.id;
  const { data: groupData, message: groupDataMessage } = await getGroupById(id);

  if (!groupData) {
    return <ErrorPage errorMessage={groupDataMessage || "Failed to load group details."} />;
  }

  // Render the GroupDetail component with the fetched data
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 "> {/* Add consistent background and padding for navbar */}
      <GroupDetail group={groupData} />
    </div>
  );
};

export default page;