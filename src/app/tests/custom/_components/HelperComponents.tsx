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


import React, { useState, useEffect } from 'react';

export const QuestionInput = ({ label, value, onChange, max }: { label: string, value: number, onChange: (val: number) => void, max: number }) => {
    // Local state to hold the string value of the input for a better typing experience
    const [displayValue, setDisplayValue] = useState(value.toString());

    /**
     * This effect syncs the local display state if the parent's `value` prop changes.
     * This is useful if the value is reset or updated from outside the component.
     */
    useEffect(() => {
        // Update display only if it's different from the numeric prop value
        // to avoid interrupting user typing.
        if (parseInt(displayValue, 10) !== value) {
            setDisplayValue(value.toString());
        }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        // Sanitize the input to allow only digits (removes letters, symbols, etc.)
        const sanitizedValue = rawValue.replace(/[^0-9]/g, '');

        // Immediately update what the user sees in the input field
        setDisplayValue(sanitizedValue);

        // Determine the numeric value, defaulting to 0 for an empty string
        let numValue = sanitizedValue === '' ? 0 : parseInt(sanitizedValue, 10);

        // Enforce the maximum value
        if (numValue > max) {
            numValue = max;
            // Also update the display value to reflect the capped number
            setDisplayValue(max.toString());
        }
        
        // Pass the sanitized number up to the parent component
        onChange(numValue);
    };

    /**
     * On blur, format the display value to match the true numeric state.
     * This cleans up inputs like leading zeros (e.g., '05' becomes '5')
     * or an empty input (becomes '0').
     */
    const handleBlur = () => {
        setDisplayValue(value.toString());
    };

    return (
        <div className="flex items-center justify-between group">
            <label className="text-sm font-medium text-gray-700 transition-colors group-hover:text-indigo-600">{label}</label>
            <div className="relative">
                <input
                    // Use "text" for better control and mobile experience
                    type="text" 
                    // Crucial for mobile: brings up the numeric keyboard
                    inputMode="numeric" 
                    // Helps with validation and keyboard type on some browsers
                    pattern="[0-9]*" 
                    // The input's value is controlled by our local string state
                    value={displayValue} 
                    onChange={handleInputChange}
                    onBlur={handleBlur} // Clean up the display on blur
                    className="w-24 h-9 px-3 rounded-lg border-2 border-gray-200 bg-white text-center text-sm font-medium text-gray-700 shadow-sm transition-all 
                              hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1
                              focus:outline-none focus:shadow-outline-indigo"
                    placeholder="0"
                />
            </div>
        </div>
    );
};
