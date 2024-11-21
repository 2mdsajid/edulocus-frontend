import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


type Props = {
    children: React.ReactNode,
    isSelected: boolean,
    onClick: () => void
}
export const CustomBadge = ({ children, isSelected, onClick }: Props) => (
    <Badge
        variant="outline"
        className={cn(
            "cursor-pointer transition-all duration-300 ease-in-out",
            isSelected
                ? "bg-gray-400 text-color1 hover:bg-gray-600"
                : "bg-primary text-black hover:bg-gray-400 hover:text-gray-600"
        )}
        onClick={onClick}
    >
        {children}
    </Badge>
)