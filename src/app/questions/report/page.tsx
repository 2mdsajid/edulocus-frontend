import ErrorPage from "@/components/reusable/ErrorPage";
import { getReportedQuestions, getSyllabus } from "@/lib/actions/questions.actions";
import ReportQuestionCard from "./_components/ReportQuestionCard";

const page = async () => {
    //call function here to fetch the questions
    const { data, message } = await getReportedQuestions()
    console.log(data)

    if (!data || data.length === 0) {
        return <div>No reported questions found</div>
    }

    return (
        <div className="space-y-4">
            {data.map((question) => (
                <ReportQuestionCard
                    key={question.id}
                    question={question}
                    showReportInfo={true}
                />
            ))}
        </div>
    )
}

export default page