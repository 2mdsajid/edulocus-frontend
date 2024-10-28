import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllSubjects } from '../../_components/methods'
import { TPGSyllabus } from '../../_components/schema'


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