import { Link } from 'react-router-dom';
import { Container } from '../ui';
import type { University } from '../../constants/universities';
import { useLocalization } from '../../hooks/useLocalization';

interface UniversityHeroProps {
    uni: University;
}

export const UniversityHero = ({ uni }: UniversityHeroProps) => {
    const { currentLang, getLocalizedText } = useLocalization();

    // Find country object if needed - we can pass it down or find it here
    // For simplicity, we just use the uni's country ID or pass it from parent.
    // Assuming country flags/names are needed, it's better to pass it as a prop
    // but we can keep it simple first.

    return (
        <section className="relative h-[65vh] min-h-[500px] flex items-end pb-10 text-white overflow-hidden">
            <img
                src={uni.image}
                alt={getLocalizedText(uni.name)}
                className="absolute inset-0 w-full h-full object-cover z-0"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001D4A] via-[#001D4A]/60 to-[#001D4A]/20 z-10"></div>

            <Container className="relative z-20">
                <div className="flex items-end gap-6">
                    {/* Logo */}
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-3 flex-shrink-0">
                        <img
                            src={uni.logo}
                            alt={`${getLocalizedText(uni.name)} logo`}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Breadcrumb */}
                        <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 mb-4 backdrop-blur-sm bg-white/5">
                            <nav className="text-sm font-medium flex items-center gap-2" aria-label="Breadcrumb">
                                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                                    {currentLang === 'ar' ? 'الرئيسية' : 'Home'}
                                </Link>
                                <span className="text-[#FF822E]">/</span>
                                <Link to="/universities" className="text-white/70 hover:text-white transition-colors">
                                    {currentLang === 'ar' ? 'جامعاتنا' : 'Universities'}
                                </Link>
                                <span className="text-[#FF822E]">/</span>
                                <span className="text-[#FF822E] font-semibold truncate">{getLocalizedText(uni.name)}</span>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black font-['Tajawal'] mb-3 leading-tight">
                            {getLocalizedText(uni.name)}
                        </h1>
                        {uni.name['en'] && currentLang !== 'en' && (
                            <p className="text-lg text-white/70 font-['Montserrat'] mb-3">{uni.name['en']}</p>
                        )}

                        {/* Quick Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 font-['Tajawal']">
                            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <i className="fas fa-map-marker-alt text-[#FF822E]"></i>
                                {getLocalizedText(uni.city)}
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <i className="fas fa-calendar text-[#FF822E]"></i>
                                {currentLang === 'ar' ? `تأسست ${uni.established}` : `Est. ${uni.established}`}
                            </span>
                            {uni.studentsCount && (
                                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <i className="fas fa-users text-[#FF822E]"></i>
                                    {uni.studentsCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 mt-6">
                    <a
                        href={`https://wa.me/905451365495?text=${encodeURIComponent(currentLang === 'ar' ? `أرغب بالاستفسار عن جامعة ${getLocalizedText(uni.name)}` : `I want to inquire about ${getLocalizedText(uni.name)}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#FF822E] hover:bg-[#e0701f] text-white px-8 py-3 rounded-xl font-bold font-['Tajawal'] transition-all hover:shadow-lg flex items-center gap-2"
                    >
                        <i className="fab fa-whatsapp text-lg"></i>
                        {currentLang === 'ar' ? 'التسجيل مجاناً والحصول على خصم' : 'Register for Free & Get Discount'}
                    </a>
                    {uni.website && (
                        <a
                            href={uni.website}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold font-['Tajawal'] transition-all border border-white/20 flex items-center gap-2"
                        >
                            <i className="fas fa-external-link-alt text-sm"></i>
                            {currentLang === 'ar' ? 'الموقع الرسمي' : 'Official Website'}
                        </a>
                    )}
                </div>
            </Container>
        </section>
    );
};
