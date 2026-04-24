<<<<<<< HEAD
import type { ReactNode } from 'react';
=======
import { ReactNode } from 'react';
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeStyles = {
    sm: 'max-w-[800px] 2xl:max-w-[900px]',
    md: 'max-w-[1000px] 2xl:max-w-[1200px]',
    lg: 'max-w-[1200px] 2xl:max-w-[1500px]',
    xl: 'max-w-[1400px] 2xl:max-w-[1700px]',
    '2xl': 'max-w-[1600px] 2xl:max-w-[1900px]',
};

const Container = ({ children, className = '', size = 'lg' }: ContainerProps) => {
    return (
        <div className={`${sizeStyles[size]} mx-auto px-5 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
