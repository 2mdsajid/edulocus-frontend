import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllStreams, getAllSubjects, getCategoriesOfStream } from '../../_components/methods'
import { TPGSyllabus } from '../../_components/schema'
import { TStreamHierarchy } from './schema'


type Props = {
    streamHierarchy: TStreamHierarchy[]
    stream: string
    category: string | null
    onChange: (value: string) => void
}

const CategoryInput = (props: Props) => {
    const categories = getCategoriesOfStream(props.streamHierarchy, props.stream)

    if (!categories) {
        return <p>No Categories To Select</p>
    }

    return <DropDownInput
        category='category'
        value={props.category || 'category'}
        onChange={(value) => {
            props.onChange(value);
        }}
        dropdownMenu={categories}
    />
}

export default CategoryInput