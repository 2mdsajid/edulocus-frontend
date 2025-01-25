import { TBaseCustomTest, TTypeOfTestsAndDescription } from "./schema";


// export const getAllTests = async (): Promise<{
//     data: TBaseCustomTest[] | null;
//     message: string;
// }> => {
//     try {
//         const response = await fetch(`${process.env.BACKEND}/tests/get-all-tests`, {
//             method: "GET",
//             cache: 'no-store',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         const { data, message } = await response.json();
//         return { data, message };
//     } catch (error) {
//         return { data: null, message: "Some Error Occured while fetching all tests!" };
//     }
// };

export const getTypesOfTests = async (): Promise<{
    data: TTypeOfTestsAndDescription[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-types-of-tests`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: [], message }
        }
        
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getAllTestsByType = async (type: TTypeOfTest): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-tests-by-type/${type}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }
        
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ getAllTestsByType ~ error:", error)
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};