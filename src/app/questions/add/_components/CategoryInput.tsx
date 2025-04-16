import DropDownInput from '@/components/reusable/DropDownInput'
import { getCategoriesOfStream } from '@/lib/methods/questions.methods'
import { TStreamHierarchy } from '@/lib/schema/questions.schema'
import { TStream } from '@/lib/schema/users.schema'


type Props = {
    streamHierarchy: TStreamHierarchy[]
    stream: TStream
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