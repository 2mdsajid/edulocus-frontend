import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllSubjects, getTopicsBySubject } from '../../_components/methods'
import { TPGSyllabus } from '../../_components/schema'


type Props = {
    syllabus: TPGSyllabus
    subject: string
    chapter: string
    onChange: (value: string) => void
}

const ChapterInput = (props: Props) => {
    const chapters = getTopicsBySubject(props.syllabus, props.subject)
    return <DropDownInput
        category='chapter'
        value={props.chapter || 'chapter'}
        onChange={(value) => {
            props.onChange(value);
        }}
        dropdownMenu={chapters || []}
    />
}

export default ChapterInput