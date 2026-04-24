import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const FloatingContactButtons = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const contactOptions = [
        {
            icon: 'fas fa-video',
            label: 'consultation.methods.zoom',
            color: '#2D8CFF',
            link: 'https://wa.me/905451365495',
        },
        {
            icon: 'fab fa-whatsapp',
            label: 'consultation.methods.whatsapp',
            color: '#25D366',
            link: 'https://wa.me/905451365495',
        },
        {
            icon: 'fab fa-google',
            label: 'consultation.methods.google_meet',
            color: '#EA4335',
            link: 'mailto:info@everest-edu.com',
        },
    ];

    return (
        <>
            {/* Floating Button - الزر الأصفر - يختفي عند فتح الـ modal */}
            {!isOpen && (
                <button
                    onClick={toggleModal}
                    className="fixed right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#FF822E] rounded-l-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-[999] hover:w-20"
                    aria-label="Open contact options"
                >
                    <i className="fas fa-plus text-2xl text-white transition-all duration-300 group-hover:scale-110"></i>
                </button>
            )}

            {/* Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-opacity duration-300"
                    onClick={closeModal}
                />
            )}

            {/* Modal Content */}
            <div
                className={`fixed right-8 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl transition-all duration-500 z-[999] ${isOpen
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 translate-x-20 scale-95 pointer-events-none'
                    }`}
                style={{ width: '380px', maxWidth: '90vw' }}
            >
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-[#0859BC] mb-2">
                            {t('consultation.modal.title')}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {t('consultation.modal.subtitle')}
                        </p>
                    </div>

                    {/* Contact Options */}
                    <div className="space-y-3 mb-6">
                        {contactOptions.map((option, index) => (
                            <a
                                key={index}
                                href={option.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 group hover:shadow-md"
                                onClick={closeModal}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${option.color}15` }}
                                >
                                    <i
                                        className={`${option.icon} text-xl`}
                                        style={{ color: option.color }}
                                    ></i>
                                </div>
                                <span className="text-gray-800 font-semibold flex-1">
                                    {t(option.label)}
                                </span>
                                <i className="fas fa-arrow-left text-base text-gray-400 group-hover:text-[#0859BC] transition-colors"></i>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <a
                        href="https://wa.me/905451365495"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 px-6 bg-gradient-to-r from-[#0859BC] to-[#064a96] text-white rounded-2xl font-bold text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        onClick={closeModal}
                    >
                        <i className="fas fa-calendar-check text-base ml-2"></i>
                        {t('consultation.modal.cta_button')}
                    </a>
                </div>

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute -top-3 -left-3 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Close"
                >
                    <i className="fas fa-times text-base"></i>
                </button>
            </div>
        </>
    );
};

export default FloatingContactButtons;
