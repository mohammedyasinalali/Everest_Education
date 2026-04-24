import type { ReactNode } from 'react';

interface ContactInfoCardProps {
    icon: string;
    title: string;
    children: ReactNode;
}

const ContactInfoCard = ({ icon, title, children }: ContactInfoCardProps) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                <i className={`${icon} text-[#0859BC] text-2xl`}></i>
            </div>
            <h3 className="text-[#0859BC] font-bold text-lg mb-3">{title}</h3>
            <div className="text-gray-700 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default ContactInfoCard;
