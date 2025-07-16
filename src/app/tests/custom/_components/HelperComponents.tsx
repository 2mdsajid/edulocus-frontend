export const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const Checkbox = ({ id, label, checked, onChange, disabled = false }: { id: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean }) => (
    <div className="flex items-center">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={id} className={`ml-3 block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {label}
        </label>
    </div>
);


export const QuestionInput = ({ label, value, onChange, max }: { label: string, value: number, onChange: (val: number) => void, max: number }) => (
    <div className="flex items-center justify-between group">
        <label className="text-sm font-medium text-gray-700 transition-colors group-hover:text-indigo-600">{label}</label>
        <div className="relative">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                min="0"
                max={max}
                className="w-24 h-9 px-3 rounded-lg border-2 border-gray-200 bg-white text-center text-sm font-medium text-gray-700 shadow-sm transition-all 
                          hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1
                          focus:outline-none focus:shadow-outline-indigo"
                placeholder="0"
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <span className="text-gray-400"></span>
            </div>
        </div>
    </div>
);
