import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllTopicsBySubject } from '@/lib/methods/questions.methods'
import { TPGSyllabus } from '@/lib/schema/questions.schema'


type Props = {
    syllabus: TPGSyllabus
    subject: string
    chapter: string
    onChange: (value: string) => void
}

const ChapterInput = (props: Props) => {
    const chapters = getAllTopicsBySubject(props.syllabus, props.subject)
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