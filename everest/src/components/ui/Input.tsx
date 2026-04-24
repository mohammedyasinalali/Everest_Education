import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    error?: string;
}

export const Input = ({ label, icon, error, className = '', ...props }: InputProps) => {
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="text-white/90 text-sm font-medium pr-2 block">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    {...props}
                    className={`w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border text-white placeholder-white/40 focus:bg-white/20 focus:outline-none transition-all duration-300 backdrop-blur-md shadow-inner ${error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-white/50'
                        } ${className}`}
                />
                {icon && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 text-white/30 pointer-events-none group-focus-within:text-white/80 transition-colors rtl:left-auto rtl:right-4">
                        {icon}
                    </div>
                )}
            </div>
            {error && <p className="text-red-400 text-xs mt-1 px-2">{error}</p>}
        </div>
    );
};
