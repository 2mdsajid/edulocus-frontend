import ErrorPage from "@/components/reusable/ErrorPage"
import { SearchableResultTable, SearchableResultTableColumns } from "@/components/reusable/SearchableResultTable"
import { getTestMetadata } from "@/lib/actions/tests.actions"
import { getUserSession } from "@/lib/auth/auth"
import { constructMetadata } from "@/lib/data"
import { Metadata } from "next"
import GenerateLeaderboardPDF from "./_components/GenerateLeaderboardPDF"
import TestInfoFooter from "./_components/TestInfoFooter"
import TestInput from "./_components/TestInput"

type Props = {
    params: {
        id: string
    },
    searchParams: {
        gid: string
    }
}


export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { data: testMetadata, message } = await getTestMetadata(props.params.id)
    if (!testMetadata) {
        return constructMetadata({
            title: `EduLocus | Test`,
            description: `Test from EduLocus for more comprehensive learning experience.`
        });
    }
    return constructMetadata({
        title: `Edulocus | ${testMetadata.name}`,
        description: `${testMetadata.name} created by ${testMetadata.createdBy} for a comprehensive learning experience.`,
    });
};


const page = async (props: Props) => {
    const { data: user, message: authMessage } = await getUserSession()

    const { id: testid } = props.params
    const { gid } = props.searchParams
    // to do later ---
    // let uniqueid = userId
    // if (!uniqueid) {
    //     uniqueid = generateVerificationKey(15)
    // }
    // const token = generateJWT({
    //     id: uniqueid,
    // })
    // to do later ---

    const { data: testMetadata, message } = await getTestMetadata(testid)
    if (!testMetadata) {
        return <ErrorPage errorMessage={message} />
    }

    console.log(testMetadata)
    const rankedUsers = [...testMetadata.usersAttended]
        .sort((a, b) => b.totalScore - a.totalScore) // Sort by score (descending)
        .map((user, index) => ({
            ...user,
            rank: index + 1, // Assign rank starting from 1
        }));

    return (
        <div className="flex flex-col lg:flex-row flex-grow gap-5 bg-bg1">
            <div className="w-full lg:w-[40%]  bg-primary dark:bg-dark-primary border p-8 rounded-lg shadow h-fit">
                {testMetadata.imageUrl && (
                    <img
                        src={testMetadata.imageUrl}
                        alt={testMetadata.name}
                        className="rounded-md w-full h-48 object-cover mb-4"
                        loading="lazy"
                    />
                )}
                <div className="text-center mb-5">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{testMetadata.name}</h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <span>By: {testMetadata.createdBy}</span> | <span>{testMetadata.questionsCount} Questions</span>
                        </p>
                    </div>
                </div>

                {/* Conditional rendering for TestInput or Archive Message */}
                {testMetadata.archive ? (
                    <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-400">This test is no longer available</p>
                    </div>
                ) : (
                    <div className="relative">
                        <TestInput testid={testMetadata.id} testLock={testMetadata.testLock} specialUrl={testMetadata.specialUrl} />
                    </div>
                )}
            </div>

            <div className="w-full lg:w-[60%] bg-primary  h-fit p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏆</span> {/* Emoji acting as an icon */}
                    <h2 className="text-xl font-bold ">Leaderboard</h2>
                </div>


                {/* Leaderboard PDF Download Button */}
                {gid && ( // Only show when view via group with a gid in url
                    <GenerateLeaderboardPDF
                        rankedUsers={rankedUsers}
                        testName={testMetadata.name}
                        testDate={testMetadata.date}
                        description={testMetadata.description || undefined} 
                    />
                )}
                <SearchableResultTable columns={SearchableResultTableColumns} data={rankedUsers} />
            </div>


            {testMetadata.description && <div className="w-full lg:w-[60%] bg-primary  h-fit p-4 rounded-lg shadow border">
                <TestInfoFooter
                    description={testMetadata.description}
                    specialUrl={testMetadata.specialUrl}
                    specialImage={testMetadata.specialImage}
                />
            </div>}
        </div>
    )

}

export default page