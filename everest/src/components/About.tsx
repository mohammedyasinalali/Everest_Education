import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button } from './ui';
import { useInView } from '../hooks/useInView';

const About = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const isTextInView = useInView(textRef as any, { threshold: 0.1, triggerOnce: true });
    const isImageInView = useInView(imageRef as any, { threshold: 0.1, triggerOnce: true });

    const features = [
        'about.features.university_selection',
        'about.features.registration_support',
        'about.features.accommodation_support',
    ];

    return (
        <section className="py-24 bg-[radial-gradient(circle_at_70%_20%,rgba(8,89,188,0.1),transparent_55%),radial-gradient(circle_at_85%_60%,rgba(255,130,46,0.1),transparent_55%)]">
            <Container className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                {/* Text Content */}
                <div
                    ref={textRef}
                    className={`
                        ${isRTL ? 'text-right' : 'text-left'} 
                        opacity-0 
                        ${isTextInView ? (isRTL ? 'animate-fade-in-right' : 'animate-fade-in-left') : ''}
                    `}
                >
                    <span className="inline-block px-4 py-2 rounded-full font-bold text-[#0859BC] bg-[rgba(8,89,188,0.1)] border border-[rgba(8,89,188,0.12)] mb-4">
                        {t('about.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl text-[#203252] mb-5 leading-tight">
                        {t('about.title_prefix')} <span className="text-[#0859BC] border-b-[6px] border-[rgba(255,130,46,0.55)]">{t('about.title_highlight')}</span> {t('about.title_suffix')}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-[620px] mb-5">
                        {t('about.description')}
                    </p>

                    <ul className="grid gap-3 mb-7 p-0 list-none">
                        {features.map((item, index) => (
                            <li
                                key={index}
                                className={`relative ${isRTL ? 'pr-7 before:right-0' : 'pl-7 before:left-0'} text-gray-700 font-medium before:content-[''] before:absolute before:top-2.5 before:w-3 before:h-3 before:rounded-full before:bg-[#FF822E] before:shadow-[0_8px_20px_rgba(255,130,46,0.35)]`}
                            >
                                {t(item)}
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 flex-wrap">
                        <Button as="a" href="#contact" variant="primary">
                            {t('common.contact_us')}
                        </Button>
                        <Button as="a" href="#services" variant="outline">
                            {t('common.services')}
                        </Button>
                    </div>
                </div>

                {/* Orbit Visual */}
                <div
                    ref={imageRef as any}
                    className={`
                        flex justify-center 
                        opacity-0 
                        ${isImageInView ? (isRTL ? 'animate-fade-in-left' : 'animate-fade-in-right') : ''}
                    `}
                >
                    <div className="relative w-[440px] h-[440px] grid place-items-center max-w-full">
                        {/* Dashed circles */}
                        <div className="absolute inset-[26px] rounded-full border-2 border-dashed border-[rgba(32,50,82,0.18)]"></div>
                        <div className="absolute inset-[64px] rounded-full border-2 border-dashed border-[rgba(32,50,82,0.1)]"></div>

                        {/* Main Image */}
                        <div className="w-[290px] h-[290px] rounded-full overflow-hidden relative shadow-[0_18px_55px_rgba(32,50,82,0.18)] border-8 border-white/85">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                                alt="Everest Team"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(8,89,188,0.18)] to-[rgba(255,130,46,0.1)] pointer-events-none"></div>
                        </div>

                        {/* Orbiting Avatars */}
                        {[
                            { src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', position: 'top-2.5 right-10' },
                            { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', position: 'top-[75px] left-4' },
                            { src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop', position: 'bottom-14 left-9' },
                            { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop', position: 'bottom-2.5 right-20' },
                        ].map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar.src}
                                alt={`Student ${index + 1}`}
                                className={`absolute w-[86px] h-[86px] rounded-full border-[6px] border-white shadow-[0_10px_25px_rgba(32,50,82,0.16)] object-cover ${avatar.position}`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default About;
