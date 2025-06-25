import ErrorPage from "@/components/reusable/ErrorPage";
import { getReportedQuestions, getSyllabus } from "@/lib/actions/questions.actions";
import ReportQuestionCard from "./_components/ReportQuestionCard";

const page = async () => {
    //call function here to fetch the questions
    const { data: questions, message } = await getReportedQuestions()

    if (!questions || questions.length === 0) {
        return <div>No reported questions found</div>
    }

    return (
        <div className="space-y-4">
            <ReportQuestionCard
                questions={questions}
            />
        </div>
    )
}

export default page