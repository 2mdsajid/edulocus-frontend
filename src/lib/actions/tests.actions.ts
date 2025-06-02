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
                name: `${subject} test`,
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


export const startChapterWiseTest = async (subject: string, chapter: string, type:TTypeOfTest): Promise<{
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



export const createCustomTest = async (
  data: TCreateCustomTestData
): Promise<{ data: string | null; message: string }> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests?limit=${data.limit}`,
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



export const getSingleTestById = async (testid: string): Promise<{
    data: TSingleCustomTestWithQuestions | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/tests/get-single-test/${testid}`, {
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
};


export const getTestBasicScores = async (testid: string): Promise<{
    data: TScoreBreakdown | null,
    message: string
}> =>{
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