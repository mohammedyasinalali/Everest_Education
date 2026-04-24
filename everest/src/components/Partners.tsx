import { useTranslation } from 'react-i18next';
import { Container } from './ui';
import { partnersRow1, partnersRow2 } from '../constants';

const Partners = () => {
    const { t } = useTranslation();

    // Border colors for variety
    const borderColors = [
        'border-[#0859BC]',
        'border-red-500',
        'border-blue-600',
        'border-purple-600',
        'border-teal-600',
        'border-orange-500',
    ];

    // Partner Logo Component
    const PartnerLogo = ({ partner, index }: { partner: string; index: number }) => {
        const borderColor = borderColors[index % borderColors.length];
        return (
            <div className="inline-flex justify-center px-1 flex-shrink-0">
                <div className="group relative">
                    <div
                        className={`relative w-32 h-32 rounded-full bg-white shadow-lg border-4 ${borderColor} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:z-10 overflow-hidden`}
                    >
                        <img
                            src={`https://placehold.co/100x100/white/333?text=${partner}`}
                            alt={partner}
                            className="w-20 h-20 object-contain"
                        />
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-gray-400 rounded-bl-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="mb-24">
            <Container>
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0859BC] mb-16">
                    {t('partners.title')}
                </h2>

                {/* Infinite Scroll Row 1 - Left to Right */}
                <div className="mt-10 mb-2 relative w-full overflow-hidden">
                    <div className="flex flex-nowrap animate-scroll-left">
                        {/* Triple the content for truly seamless scroll */}
                        {[...Array(3)].map((_, setIndex) => (
                            partnersRow1.map((partner, index) => (
                                <PartnerLogo
                                    key={`row1-set${setIndex}-${index}`}
                                    partner={partner}
                                    index={index}
                                />
                            ))
                        ))}
                    </div>
                </div>

                {/* Infinite Scroll Row 2 - Right to Left */}
                <div className="mb-2 relative w-full overflow-hidden">
                    <div className="flex flex-nowrap animate-scroll-right">
                        {/* Triple the content for truly seamless scroll */}
                        {[...Array(3)].map((_, setIndex) => (
                            partnersRow2.map((partner, index) => (
                                <PartnerLogo
                                    key={`row2-set${setIndex}-${index}`}
                                    partner={partner}
                                    index={(index + partnersRow1.length) % borderColors.length}
                                />
                            ))
                        ))}
                    </div>
                </div>

                {/* Our Mission Section */}
                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-[#0859BC] mb-4">{t('partners.blog_title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {t('partners.blog_description')}
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default Partners;    