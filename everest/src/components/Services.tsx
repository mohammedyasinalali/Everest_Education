import { useTranslation } from 'react-i18next';
import { Container } from './ui';
import { servicesData } from '../constants';

const Services = () => {
    const { t } = useTranslation();

    return (
        <section id="services" className="mb-24 scroll-mt-24">
            <Container>
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0859BC] mb-16">
                    {t('services_section.title')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service, index) => {
                        const descKey = service.title + '_desc';
                        return (
                            <div key={index} className="group h-[380px] perspective-1000">
                                <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 shadow-lg rounded-2xl">
                                    {/* Front Side */}
                                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_0%,rgba(8,89,188,0.03),transparent_70%)]">
                                        <div className="text-white bg-[#FF822E] bg-gradient-to-br from-[#FF822E] to-[#FF9E5E] w-24 h-24 flex items-center justify-center rounded-2xl mb-8 shadow-[0_15px_30px_rgba(255,130,46,0.25)] group-hover:scale-110 transition-transform duration-500">
                                            <i className={`${service.icon} text-4xl text-white`}></i>
                                        </div>
                                        <h3 className="text-xl text-[#203252] font-bold text-center px-4 leading-relaxed">
                                            {t(service.title)}
                                        </h3>
                                        <span className="mt-6 text-[#0859BC] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {t('common.read_more')}
                                        </span>
                                    </div>

                                    {/* Back Side */}
                                    <div dir="auto" className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0859BC] bg-gradient-to-br from-[#0859BC] to-[#064a96] text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 overflow-hidden" style={{ textAlign: 'center' }}>
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                                        <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 w-full" style={{ textAlign: 'center' }}>
                                            {t(service.title)}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-white/90 mb-6" style={{ textAlign: 'center' }}>
                                            {t(descKey)}
                                        </p>
                                        <a
                                            href="https://wa.me/905451365495"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-6 py-2.5 bg-white text-[#0859BC] rounded-full font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            {t('services_section.items.cta_button')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Services;
