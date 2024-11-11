import DropDownInput from '@/components/reusable/DropDownInput'
import { getAffiliationsOfStreamCategory } from '../../_components/methods'
import { TStreamHierarchy } from './schema'


type Props = {
    streamHierarchy: TStreamHierarchy[]
    stream: string
    category: string
    affiliation: string | null
    onChange: (value: string) => void
}

const AffiliationInput = (props: Props) => {
    const affiliations = getAffiliationsOfStreamCategory(props.streamHierarchy, props.stream, props.category)

    if (!affiliations) {
        return <p>No affiliations To Select</p>
    }

    return <DropDownInput
        category='affiliation'
        value={props.affiliation || 'affiliation'}
        onChange={(value) => {
            props.onChange(value);
        }}
        dropdownMenu={affiliations}
    />
}

export default AffiliationInput