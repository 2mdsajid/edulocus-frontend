'use server'


import { cookies } from "next/headers";
import { TBaseCustomTest, TTypeOfTestsAndDescription, TTotalQuestionsPerSubjectAndChapter, TCreateCustomTestData, TBaseUserScore, TSingleCustomTestWithQuestions, TCreateTestAnalytic, TSaveUserScore, TCustomTestMetadata, TQuestion, TBaseQuestion, TScoreBreakdown } from "../schema/tests.schema";

export const getAllTests = async (): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-all-tests`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getAllTestsCreatedByUser = async (): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }


        const response = await fetch(`${process.env.BACKEND}/tests/get-all-tests-created-by-user`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
            },
        });
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


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

export const getLiveTests = async (date: string): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies()
        const stream = cookieStore.get('stream')?.value

        if (!stream) {
            return { data: null, message: "Stream not found!" }
        }

        const response = await fetch(`${process.env.BACKEND}/tests/get-daily-tests/${date}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ getLiveTest ~ error:", error)
        return { data: null, message: "Some Error Occured while fetching live test!" };
    }
};



export const getAllTestsByType = async (type: TTypeOfTest): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies()
        const stream = cookieStore.get('stream')?.value

        if (!stream) {
            return { data: null, message: "Stream not found!" }
        }


        const response = await fetch(`${process.env.BACKEND}/tests/get-tests-by-type/${type}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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



export const startSubjectWiseTest = async (subject: string, type: TTypeOfTest): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies()
        const authToken = cookieStore.get('auth-token')?.value

        const stream = cookieStore.get('stream')?.value

        if (!stream) {
            return { data: null, message: "Stream not found!" }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests-by-users?subject=${subject}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({
                name: `${subject.replace('_',' ')} test`,
                type: type,
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ startSubjectWiseTest ~ error:", error)
        return { data: null, message: "Some Error Occured while creating subjectwise tests!" };
    }
};


export const startChapterWiseTest = async (subject: string, chapter: string, type: TTypeOfTest): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies()
        const authToken = cookieStore.get('auth-token')?.value

        const stream = cookieStore.get('stream')?.value

        if (!stream) {
            return { data: null, message: "Stream not found!" }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests-by-users?subject=${subject}&chapter=${chapter}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({
                name: `${chapter} of ${subject} test`,
                type: type
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};



export const createCustomTestMetaData = async (
    data: TCreateCustomTestData
): Promise<{ data: string | null; message: string }> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }
        console.log(data)
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-test-metadata?limit=${data.limit}&gid=${data.gid}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                body: JSON.stringify({
                    stream: data.stream,
                    name: data.name,
                    slug: data.slug,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    specialUrl: data.specialUrl,
                    specialImage: data.specialImage,
                    isLocked: data.isLocked
                }),
            }
        );

        if (!response.ok) {
            const { message } = await response.json();
            console.log(message)
            return { data: null, message };
        }

        const { data: responseData, message } = await response.json();
        console.log(responseData)
        return { data: responseData, message };
    } catch (error) {
        console.error("Error creating custom test:", error);
        return { data: null, message: "An unexpected error occurred while creating custom test." };
    }
};



export const getSingleTestById = async (testid: string, testCode?:string, testToken?:string): Promise<{
    data: TSingleCustomTestWithQuestions | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-single-test/${testid}?c=${testCode}&t=${testToken}`, {
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
        console.log(error)
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getSingleTestByIdForEdit = async (testid: string): Promise<{
    data: TSingleCustomTestWithQuestions | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }
                
        const response = await fetch(`${process.env.BACKEND}/tests/get-single-test-for-edit/${testid}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getTestBasicScores = async (testid: string): Promise<{
    data: TScoreBreakdown | null,
    message: string
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-test-basic-scores/${testid}`, {
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
}

export const sendTestAnalytic = async (testData: TCreateTestAnalytic): Promise<{
    data: ShadcnToast | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/save-test-analytic`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testData),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }


        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while saving test analytics!" };
    }
};


export const sendUserScore = async (userScoreData: TSaveUserScore): Promise<{
    data: TBaseUserScore | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/save-user-score`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userScoreData),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while saving user score!" };
    }
};



export const getTestMetadata = async (testid: string): Promise<{
    data: TCustomTestMetadata | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-test-metadata/${testid}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message: message }
        }
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching test metadata!" };
    }
};





export const updateTestQuestions = async (testid: string, questionIds: string[]): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/update-test-questions/${testid}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
            body: JSON.stringify({
                questionIds
            })
        })

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };

    } catch (error) {
        return { data: null, message: "Some Error Occured while updating test questions!" };
    }
};



export const disableTestAction = async (testId: string): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        console.log(testId)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/archive-test/${testId}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
            }
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };

    } catch (error) {
        return { data: null, message: "Some Error Occured while disabling test!" };
    }
};


export const generateTestCodes = async (testId: string, limit: number): Promise<{
    data: string[] | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        if (!testId) {
            return { data: null, message: "Test ID is required." };
        }
        if (typeof limit !== 'number' || limit < 1 || !Number.isInteger(limit)) {
            return { data: null, message: "Limit must be a positive integer." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/generate-test-codes`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
            body: JSON.stringify({
                testId,
                limit
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };

    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while generating test codes!" };
    }
};


export const getCurrentChapterWiseTest = async (dateandtime:string): Promise<{
    data: TSingleCustomTestWithQuestions | null;
    message: string;
}> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-current-chapterwise-test/${dateandtime}`, {
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
        console.log("🚀 ~ getCurrentChapterWiseTest ~ error:", error)
        return { data: null, message: "Some Error Occured while getting current chapterwise test!" };
    }
};

