import DropDownInput from '@/components/reusable/DropDownInput'
import { getAllStreams, getAllSubjects } from '../../_components/methods'
import { TPGSyllabus } from '../../_components/schema'
import { TStreamHierarchy } from './schema'


type Props = {
    streamHierarchy: TStreamHierarchy[]
    stream: string
    onChange: (value: string) => void
}

const StreamInput = (props: Props) => {
    const streams = getAllStreams(props.streamHierarchy)
    return <DropDownInput
        category='stream'
        value={props.stream || 'stream'}
        onChange={(value) => {
            props.onChange(value);
        }}
        dropdownMenu={streams}
    />
}

export default StreamInput