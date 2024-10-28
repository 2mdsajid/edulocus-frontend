import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

const SubmitButton = ({ className, initialstate, loadingstate, isLoadingState, onClick }: { className?: string, initialstate: string, loadingstate: string, isLoadingState: boolean, onClick?: () => void }) => {
    return (
        <Button onClick={onClick} disabled={isLoadingState} type='submit' className={cn('text-white font-bold py-2 px-4 rounded', className)}>{isLoadingState ? `${loadingstate}` : `${initialstate}`}</Button>
    )
}

export default SubmitButton
