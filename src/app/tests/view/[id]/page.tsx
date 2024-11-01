import ErrorPage from "@/components/reusable/ErrorPage"
import { SearchableResultTable, SearchableResultTableColumns } from "@/components/reusable/SearchableResultTable"
import { getUserSession } from "@/lib/auth/auth"
import { getTestMetadata } from "./_components/actions"
import TestInput from "./_components/TestInput"

type Props = {
    params: {
        id: string
    }
}


// export const generateMetadata = async (props: Props): Promise<Metadata> => {


//     const response = await fetch(`${process.env.BACKEND}/get-custom-tests-metadata/${typeoftest}/${testid}`, {
//         method: 'GET',
//         cache: 'no-store'
//     })

//     if (!response.ok) {
//         return constructMetadata({
//             title: `Edulocus | ${typeoftest}`,
//             description: `${testid} from ${typeoftest} created by ..`
//         });
//     }
//     const testData = await response.json() as any
//     return constructMetadata({
//         title: `Edulocus | ${typeoftest}`,
//         description: `${testid} from ${typeoftest} created by ${testData.creatorName}`,
//         image: testData.image ? testData.image : testData.creatorImage
//     });

// };


const page = async (props: Props) => {
    const { data: user, message: authMessage } = await getUserSession()

    const { id: testid } = props.params
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
    const rankedUsers = [...testMetadata.usersAttended]
        .sort((a, b) => b.totalScore - a.totalScore) // Sort by score (descending)
        .map((user, index) => ({
            ...user,
            rank: index + 1, // Assign rank starting from 1
        }));

    return (
        <div className="flex flex-col md:flex-row flex-grow gap-5 bg-bg1">
            <div className="w-full md:w-[40%]  bg-primary dark:bg-dark-primary border p-8 rounded-lg shadow h-fit">
                {testMetadata.image && (
                    <img
                        src={testMetadata.image}
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

                <div className="relative">
                    <TestInput testid={testMetadata.id} />
                </div>
            </div>

            <div className="w-full md:w-[60%] bg-primary  h-fit p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏆</span> {/* Emoji acting as an icon */}
                    <h2 className="text-xl font-bold ">Leaderboard</h2>
                </div>
                <SearchableResultTable columns={SearchableResultTableColumns} data={rankedUsers} />
            </div>
        </div>
    )

}

export default page