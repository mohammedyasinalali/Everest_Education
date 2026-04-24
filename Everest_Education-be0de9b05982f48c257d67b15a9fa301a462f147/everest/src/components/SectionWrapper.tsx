import type { ReactNode } from 'react';
import { Container } from './ui';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    background?: 'white' | 'gray' | 'gradient-blue' | 'gradient-gray';
    fullWidth?: boolean;
}

const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    'gradient-blue': 'bg-gradient-to-r from-[#0859BC] via-[#064a96] to-[#0859BC]',
    'gradient-gray': 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
};

const SectionWrapper = ({
    children,
    className = '',
    containerClassName = '',
    background = 'white',
    fullWidth = false
}: SectionWrapperProps) => {
    const bgClass = backgroundClasses[background] || backgroundClasses.white;

    return (
        <section className={`py-20 ${bgClass} ${className}`}>
            {fullWidth ? (
                <div className={containerClassName}>
                    {children}
                </div>
            ) : (
                <Container className={containerClassName}>
                    {children}
                </Container>
            )}
        </section>
    );
};

export default SectionWrapper;
