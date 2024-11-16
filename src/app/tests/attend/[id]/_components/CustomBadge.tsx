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
                ? "bg-color7 text-color1 hover:bg-color8"
                : "bg-color2 text-color9 hover:bg-color4 hover:text-color10"
        )}
        onClick={onClick}
    >
        {children}
    </Badge>
)