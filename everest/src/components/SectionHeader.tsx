import type { ReactNode } from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
    titleColor?: string;
    children?: ReactNode;
}

const SectionHeader = ({
    title,
    subtitle,
    badge,
    centered = true,
    titleColor = 'text-[#0859BC]',
    children
}: SectionHeaderProps) => {
    const alignClass = centered ? 'text-center' : 'text-right';

    return (
        <div className={`mb-16 ${alignClass}`}>
            {/* Badge */}
            {badge && (
                <span className="inline-block bg-[#0859BC]/10 text-[#0859BC] px-6 py-2 rounded-full text-sm font-semibold mb-4">
                    {badge}
                </span>
            )}

            {/* Title */}
            <h2 className={`text-4xl md:text-5xl font-bold ${titleColor} mb-4 relative ${centered ? 'inline-block' : ''}`}>
                {title}
                {centered && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF822E] to-[#0859BC] rounded-full mt-4"></div>
                )}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}

            {/* Additional Content */}
            {children}
        </div>
    );
};

export default SectionHeader;
