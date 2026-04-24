import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './ui';
import { useInView } from '../hooks/useInView';

const Consultation = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const isContentInView = useInView(contentRef as any, { threshold: 0.1, triggerOnce: true });
    const isImageInView = useInView(imageRef as any, { threshold: 0.1, triggerOnce: true });

    const contactMethods = [
        { icon: 'fab fa-google', color: '#db4437', label: 'consultation.methods.google_meet', link: 'mailto:info@everest-edu.com' },
        { icon: 'fab fa-whatsapp', color: '#25d366', label: 'consultation.methods.whatsapp', link: 'https://wa.me/905451365495' },
        { icon: 'fas fa-video', color: '#2196f3', label: 'consultation.methods.zoom', link: 'https://wa.me/905451365495' },
    ];

    return (
        <section className="mb-24 relative overflow-hidden py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0859BC] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF822E] rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                <div className="bg-gradient-to-br from-white via-white to-[#f0f4f8] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(32,50,82,0.12)] border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0">
                        {/* Content Side */}
                        <div
                            ref={contentRef}
                            className={`p-10 lg:p-16 flex flex-col justify-center opacity-0 ${isContentInView ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : ''}`}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0859BC]/10 rounded-full w-fit mb-6">
                                <i className="fas fa-calendar-check text-base text-[#0859BC]"></i>
                                <span className="text-sm font-semibold text-[#0859BC]">{t('consultation.badge')}</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-[#0859BC] text-3xl md:text-4xl mb-5 font-bold leading-tight">
                                {t('consultation.title_main')}
                                <span className="block text-2xl md:text-3xl text-[#FF822E] mt-2">{t('consultation.title_sub')}</span>
                            </h2>

                            {/* Description */}
                            <p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-lg">
                                {t('consultation.description')}
                            </p>

                            {/* Contact Methods */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {contactMethods.map((method, index) => (
                                    <a
                                        key={index}
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: `${method.color}15` }}
                                        >
                                            <i
                                                className={`${method.icon} text-xl`}
                                                style={{ color: method.color }}
                                            ></i>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-[#0859BC] transition-colors">
                                            {t(method.label)}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <a
                                href="https://wa.me/905451365495"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0859BC] to-[#064a96] text-white rounded-full font-semibold text-lg shadow-[0_10px_30px_rgba(8,89,188,0.3)] hover:shadow-[0_15px_40px_rgba(8,89,188,0.4)] hover:-translate-y-1 transition-all duration-300 w-full lg:w-auto"
                            >
                                <i className="fas fa-calendar-plus text-xl"></i>
                                {t('consultation.cta_button')}
                            </a>
                        </div>

                        {/* Image Side */}
                        <div
                            ref={imageRef}
                            className={`relative h-[300px] lg:h-auto overflow-hidden opacity-0 ${isImageInView ? (isRTL ? 'animate-fade-in-left' : 'animate-fade-in-right') : ''}`}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0859BC]/20 to-transparent z-10"></div>

                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                alt="Education Consultant"
                                className="h-full w-full object-cover"
                            />

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 right-8 z-20 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#0859BC] to-[#064a96] rounded-full flex items-center justify-center">
                                        <i className="fas fa-user-graduate text-xl text-white"></i>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#0859BC]">2,000+</div>
                                        <div className="text-sm text-gray-600">{t('consultation.student_count')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Consultation;
