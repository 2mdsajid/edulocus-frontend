import ErrorPage from "@/components/reusable/ErrorPage";
import { Separator } from "@/components/ui/separator"; // For a nice visual separation
import { getAllGroupsByUser } from "@/lib/actions/group.actions"; // Corrected import to the action
import { getUserSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { SingleGroupCard } from "./_components/SingleGroupCard";

const ModeratorGroupsPage = async () => { 

  const { data: user, message: authMessage } = await getUserSession()
    if (!user || !user.googleId || !user.id) {
        redirect('/login?ru=/group')
    } 


  const { data: groups, message } = await getAllGroupsByUser(user.id);
  if (!groups || groups.length === 0) {
    return <ErrorPage errorMessage={message || "No groups found or an error occurred."} />;
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl mb-6">
        Your Groups
      </h1>
      <Separator className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((g) => (
          <SingleGroupCard key={g.group.id} id={g.group.id} name={g.group.name}  />
        ))}
      </div>
    </div>
  );
};

export default ModeratorGroupsPage;