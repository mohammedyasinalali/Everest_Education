import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    icon?: string;
    iconPosition?: 'left' | 'right';
    className?: string;
}

type ButtonAsButton = BaseButtonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
        as?: 'button';
    };

type ButtonAsLink = BaseButtonProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
        as: 'a';
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-gradient-to-br from-[#FF822E] to-[#ff9e5e] text-white border-none shadow-[0_4px_15px_rgba(255,130,46,0.4)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,130,46,0.6)]',
    secondary:
        'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0859BC]',
    outline:
        'bg-transparent text-[#0859BC] border-2 border-[#0859BC] hover:bg-[#0859BC] hover:text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    iconPosition = 'right',
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles =
        'rounded-full font-semibold inline-flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer';

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
        <>
            {icon && iconPosition === 'left' && <i className={icon}></i>}
            {children}
            {icon && iconPosition === 'right' && <i className={icon}></i>}
        </>
    );

    if (props.as === 'a') {
        const { as, ...linkProps } = props;
        return (
            <a className={combinedStyles} {...linkProps}>
                {content}
            </a>
        );
    }

    const { as, ...buttonProps } = props as ButtonAsButton;
    return (
        <button className={combinedStyles} {...buttonProps}>
            {content}
        </button>
    );
};

export default Button;
