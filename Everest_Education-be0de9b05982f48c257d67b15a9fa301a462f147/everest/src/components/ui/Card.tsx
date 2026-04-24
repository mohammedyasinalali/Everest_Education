import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-10',
};

const Card = ({
    children,
    className = '',
    hover = true,
    padding = 'md',
}: CardProps) => {
    const baseStyles =
        'bg-white rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 border border-gray-100';
    const hoverStyles = hover
        ? 'hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:border-[#FF822E]'
        : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
