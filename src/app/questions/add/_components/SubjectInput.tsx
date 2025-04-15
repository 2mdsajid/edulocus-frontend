import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllSubjects } from '@/lib/methods/questions.methods'
import { TPGSyllabus } from '@/lib/schema/questions.schema'


type Props = {
    syllabus: TPGSyllabus
    subject: string
    onChange: (value: string) => void
}

const SubjectInput = (props: Props) => {
    const subjects = getAllSubjects(props.syllabus)
    return <DropDownInput
        category='subject'
        value={props.subject || 'subject'}
        onChange={(value) => {
            props.onChange(value);
        }}
        dropdownMenu={subjects}
    />
}

export default SubjectInput