import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import { useInView } from '../hooks/useInView';
import ContactForm from '../components/ContactForm';
import ServicesList from '../components/ServicesList';
import AfterServicesList from '../components/AfterServicesList';
import PricingPackages from '../components/PricingPackages';
import SEO from '../components/SEO';

const Services = () => {
    const { t } = useTranslation();

    const premiumImageRef = useRef<HTMLDivElement>(null);
    const isPremiumImageInView = useInView(premiumImageRef as any, { threshold: 0.2, triggerOnce: true });

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={t('header.services')}
                description={t('services_section.title') || undefined}
            />
            {/* Page Header */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop")',
                        backgroundPosition: 'center 40%'
                    }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#001D4A]/80 z-10"></div>

                {/* Content */}
                <Container className="relative z-20 text-center">
                    <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm bg-white/5">
                        <nav className="text-sm font-medium flex items-center justify-center gap-2" aria-label="Breadcrumb">
                            <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">{t('header.home')}</span>
                            <span className="text-secondary text-xs"><i className="fas fa-chevron-left"></i></span>
                            <span className="text-secondary font-bold">{t('header.services')}</span>
                        </nav>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-4 font-['Montserrat']">
                        {t('header.services')}
                    </h1>

                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6"></div>

                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        {t('services_section.title')}
                    </p>
                </Container>
            </section>

            {/* Services Grid */}
            <section className="py-20 relative z-20 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-10 left-0 w-72 h-72 bg-[#FF822E]/5 rounded-full -translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#0859BC]/5 rounded-full translate-x-1/3 pointer-events-none"></div>
                <div className="px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-['Tajawal']">
                            {t('services_section.our_services')}
                        </h2>
                        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                    </div>
                    <ServicesList />
                </div>
            </section>

            {/* After Acceptance Services Grid */}
            <section className="py-20 bg-gray-50 relative z-20 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF822E]/5 rounded-full -translate-x-1/4 pointer-events-none"></div>
                <div className="absolute top-1/2 left-10 w-60 h-60 bg-[#0859BC]/5 rounded-full pointer-events-none"></div>
                <div className="px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-['Tajawal']">
                            {t('services_section.after_services_title')}
                        </h2>
                        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                    </div>
                    <AfterServicesList />
                </div>
            </section>

            {/* Premium Quality Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#FF822E]/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
                <div className="absolute top-1/2 right-20 w-64 h-64 bg-[#FF822E]/5 rounded-full pointer-events-none"></div>

                <Container size="xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Side */}
                        <div
                            ref={premiumImageRef}
                            className={`relative lg:w-1/2 w-full opacity-0 ${isPremiumImageInView ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : ''}`}
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                    alt="Everest Education Team"
                                    className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#203252]/40 to-transparent"></div>
                            </div>
                            {/* Floating accent card */}
                            <div className="absolute -bottom-6 -left-6 bg-[#FF822E] text-white rounded-2xl px-8 py-5 shadow-xl z-10">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-award text-3xl"></i>
                                    <div>
                                        <p className="text-2xl font-black font-['Tajawal']">+5</p>
                                        <p className="text-sm font-medium opacity-90 font-['Tajawal']">{t('services_section.excellence.years_experience')}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Second floating card */}
                            <div className="absolute -top-4 -right-4 bg-[#0859BC] text-white rounded-2xl px-6 py-4 shadow-xl z-10">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-users text-2xl"></i>
                                    <div>
                                        <p className="text-xl font-black font-['Tajawal']">+2000</p>
                                        <p className="text-xs font-medium opacity-90 font-['Tajawal']">{t('services_section.excellence.students_registered')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="lg:w-1/2 w-full">
                            <div className="inline-flex items-center gap-2 bg-[#FF822E]/10 text-[#FF822E] rounded-full px-5 py-2 mb-6">
                                <i className="fas fa-star text-sm"></i>
                                <span className="text-sm font-bold font-['Tajawal']">{t('services_section.excellence.badge')}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-[#203252] leading-tight mb-8 font-['Tajawal']">
                                {t('services_section.excellence.title_part_1')}
                                <span className="text-[#FF822E]">{t('services_section.excellence.title_part_2')}</span>
                                {t('services_section.excellence.title_part_3')}
                            </h2>

                            <p className="text-gray-600 text-lg leading-[2] mb-8 font-['Tajawal']">
                                {t('services_section.excellence.desc_1')}
                            </p>

                            <p className="text-gray-600 text-lg leading-[2] mb-10 font-['Tajawal']">
                                {t('services_section.excellence.desc_2')}
                            </p>

                            {/* Features list */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {[
                                    { icon: 'fas fa-check-circle', text: t('services_section.excellence.features.admissions') },
                                    { icon: 'fas fa-check-circle', text: t('services_section.excellence.features.team') },
                                    { icon: 'fas fa-check-circle', text: t('services_section.excellence.features.followup') },
                                    { icon: 'fas fa-check-circle', text: t('services_section.excellence.features.comprehensive') },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <i className={`${item.icon} text-[#FF822E] text-lg`}></i>
                                        <span className="text-[#203252] font-semibold font-['Tajawal']">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-3 bg-gradient-to-l from-[#FF822E] to-[#FF9E5E] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-[#FF822E]/30 transition-all duration-300 hover:-translate-y-1 font-['Tajawal']"
                            >
                                <span>{t('services_section.excellence.cta')}</span>
                                <i className="fas fa-arrow-left text-sm"></i>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Pricing Packages Section */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-10 left-0 w-80 h-80 bg-[#FF822E]/5 rounded-full -translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/4 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#FFD700]/5 rounded-full -translate-x-1/2 pointer-events-none"></div>

                <Container size="xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#0859BC]/10 text-[#0859BC] rounded-full px-5 py-2 mb-6">
                            <i className="fas fa-tags text-sm"></i>
                            <span className="text-sm font-bold font-['Tajawal']">{t('services_section.packages.badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#203252] mb-4 font-['Tajawal']">
                            {t('services_section.packages.title')}
                        </h2>
                        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed font-['Tajawal']">
                            {t('services_section.packages.desc')}
                        </p>
                    </div>
                    <PricingPackages />
                </Container>
            </section>

            {/* Contact CTA */}
            <ContactForm />
        </div>
    );
};

export default Services;
