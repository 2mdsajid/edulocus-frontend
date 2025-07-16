
export const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const DifficultyButton = ({ label, onClick, isActive, disabled }: { label: string; onClick: () => void; isActive: boolean; disabled: boolean; }) => {
    const baseClasses = "w-full rounded-lg py-3 text-sm font-bold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
    const activeClasses = "bg-indigo-600 text-white shadow-md scale-105";
    const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";
    const disabledClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
    return <button type="button" onClick={onClick} disabled={disabled} className={`${baseClasses} ${disabled ? disabledClasses : isActive ? activeClasses : inactiveClasses}`}>{label}</button>;
};
