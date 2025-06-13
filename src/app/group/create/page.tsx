import { CreateGroupForm } from "./_components/CreateGroupForm"; // Adjust path if necessary
import { constructMetadata } from "@/lib/data"; // Assuming this utility exists

export const metadata = constructMetadata({
    title: 'EduLocus | Create Group',
    description: 'Create a new collaborative workspace for your users and tests.'
});

const page = async () => { 

    return (
        // Apply consistent background gradient and top padding (pt-20 for navbar clearance)
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-purple-50 pt-20">
            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32  text-center">
                <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Create Your <span className="text-purple-600">New Group</span>
                </h1>
                {/* <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                    Set up your collaborative workspace by providing essential details.
                </p> */}
            </section>

            {/* Separator for visual break (optional, but good for consistency) */}
            {/* If you have a Separator component: */}
            {/* <Separator className="my-8" /> */}

            <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-32 pb-16">
                <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                    <CreateGroupForm />
                </div>
            </section>
        </div>
    );
}

export default page;