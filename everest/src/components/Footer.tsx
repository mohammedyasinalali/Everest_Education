

import { Container } from './ui';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <section className="pt-16 pb-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 relative overflow-hidden mt-20">
            {/* Background Pattern - Diagonal Grid */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="diagonal-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <path d="M0 0h40v40H0z" fill="none" />
                            <path d="M0 0h40M0 40h40" stroke="#0859BC" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
                </svg>
            </div>

            <Container>
                <div className="grid md:grid-cols-4 gap-8 items-center relative z-10">
                    {/* Address */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(8,89,188,0.1)]">
                            <i className="fas fa-map-marker-alt text-[#0859BC] text-3xl"></i>
                        </div>
                        <h3 className="text-[#0859BC] font-bold text-lg mb-3">{t('contact.address_title')}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {t('contact.address_lines.0')}<br />
                            {t('contact.address_lines.1')}<br />
                            {t('contact.address_lines.2')}
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(8,89,188,0.1)]">
                            <i className="fas fa-phone-alt text-[#0859BC] text-3xl"></i>
                        </div>
                        <h3 className="text-[#0859BC] font-bold text-lg mb-3">{t('contact.phone_title')}</h3>
                        <p className="text-gray-700 text-sm" dir="ltr">+90 545 136 54 95</p>
                        <p className="text-gray-700 text-sm" dir="ltr">+90 545 136 54 95</p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(8,89,188,0.1)]">
                            <i className="fas fa-envelope text-[#0859BC] text-3xl"></i>
                        </div>
                        <h3 className="text-[#0859BC] font-bold text-lg mb-3">{t('contact.email_title')}</h3>
                        <p className="text-gray-700 text-sm">info@everestedu.org</p>
                        <p className="text-gray-700 text-sm">ali@everestedu.org</p>
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center md:justify-end">
                        <div className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-2xl border-8 border-[#0859BC] p-4">
                            <img
                                src="/images/logo.png"
                                alt="Everest Education Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </Container>

            {/* Copyright Bar */}
            <div className="w-full bg-[#0859BC] text-white py-4 mt-16 text-center relative z-10" dir="rtl">
                <p className="text-sm font-medium">
                    {t('footer.rights_reserved')} <span className="text-[#FF822E]">{t('footer.for_site')}</span> 2026 {t('footer.design_and_work')} <span className="font-bold text-[#FF822E]">YesTech</span>
                </p>
            </div>
        </section>
    );
};

export default Footer;
