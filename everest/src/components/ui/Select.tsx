import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
}

export const Select = ({ label, options, placeholder, error, className = '', ...props }: SelectProps) => {
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="text-white/90 text-sm font-medium pr-2 block">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    {...props}
                    className={`w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border text-white focus:bg-white/20 focus:outline-none transition-all duration-300 backdrop-blur-md appearance-none cursor-pointer ${error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-white/50'
                        } ${className}`}
                >
                    {placeholder && (
                        <option value="" disabled className="bg-[#0859BC] text-white/50">
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#0859BC] text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50 pointer-events-none rtl:left-auto rtl:right-4">
                    <i className="fas fa-chevron-down text-base"></i>
                </div>
            </div>
            {error && <p className="text-red-400 text-xs mt-1 px-2">{error}</p>}
        </div>
    );
};
