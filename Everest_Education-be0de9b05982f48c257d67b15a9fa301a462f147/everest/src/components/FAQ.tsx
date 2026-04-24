import { useState, useRef } from 'react';
import { Container } from './ui';
import { faqData } from '../constants';
import { useInView } from '../hooks/useInView';

import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);
    const isImageInView = useInView(imageRef as any, { threshold: 0.2, triggerOnce: true });

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-[#f4f6f9]">
            <Container className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Accordion Side */}
                <div className="flex-[1.5]">
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.05)] border transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)] ${activeIndex === index ? 'border-[#0859BC]' : 'border-transparent'
                                    }`}
                            >
                                <div
                                    className="py-5 px-6 flex justify-between items-center cursor-pointer bg-white transition-all duration-300"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h3
                                        className={`text-base font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-[#0859BC]' : 'text-[#203252]'
                                            }`}
                                    >
                                        {t(faq.question)}
                                    </h3>
                                    <i
                                        className={`fas fa-chevron-down text-base text-[#FF822E] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 bg-white px-6 ${activeIndex === index ? 'max-h-[500px] pb-5' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-gray-600 leading-relaxed">{t(faq.answer)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Card Side */}
                <div className="flex-1 bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden relative order-first lg:order-last">
                    <div className="p-10 relative z-10">
                        <h2 className="text-4xl font-extrabold leading-tight text-[#203252] mb-5">
                            {t('faq.title_main')} <br />
                            <span className="text-[#0859BC] border-b-[5px] border-[#FF822E] inline-block leading-[0.8]">
                                {t('faq.title_highlight')}
                            </span>
                        </h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {t('faq.description')}
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0859BC] text-white rounded-full font-semibold hover:bg-[#064a96] transition-colors duration-300"
                        >
                            {t('faq.contact_button')} <i className="fas fa-arrow-left text-base"></i>
                        </a>
                    </div>
                    {/* Replaced Image component with native <img> tag */}
                    <img
                        ref={imageRef as any}
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                        alt="Student Team"
                        className={`w-full h-full object-cover [mask-image:linear-gradient(to_top,black_80%,transparent_100%)] opacity-0 elementor-animation-grow origin-bottom ${isImageInView ? 'animate-grow-bounce' : ''}`}
                    />
                </div>
            </Container>
        </section >
    );
};

export default FAQ;
