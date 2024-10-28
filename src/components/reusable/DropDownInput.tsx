import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { cn } from '@/lib/utils'


export type Props = {
    category: string,
    value: string,
    onChange: (value: any) => void,
    dropdownMenu: string[]
    className?: string
    labelClassName?: string
    label?: string
}

const DropDownInput = (props: Props) => {
    const { category, value, onChange, dropdownMenu, labelClassName, className, label } = props
    return (
        <div className={
            cn('mb-y', className)
        }>
            <div className="">
                <label htmlFor={category} className={
                    cn('font-bold mb-5', labelClassName)
                }>Select a {label || category}</label>
                <Select onValueChange={onChange}>
                    <SelectTrigger className="w-max">
                        <SelectValue placeholder={value || category} />
                    </SelectTrigger>
                    <SelectContent className='w-max '>
                        {dropdownMenu?.map((item: string, index: number) => {
                            return <SelectItem key={index} value={item}>{item.replace(/-/g, ' ')}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}

export default DropDownInput
