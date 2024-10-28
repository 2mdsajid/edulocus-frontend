
type Props = {
    icon: React.ReactNode
    value: string
    label: string
    bgColor: string
    borderColor: string
}

function TestStatCard({ icon, value, label, bgColor, borderColor }: Props) {
    return (
        <div className={`${bgColor} ${borderColor} border rounded-lg p-4 flex items-center space-x-4`}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
            </div>
        </div>
    )
}


export default TestStatCard