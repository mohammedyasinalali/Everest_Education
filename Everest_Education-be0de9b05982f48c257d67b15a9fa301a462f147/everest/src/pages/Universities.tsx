import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { universities, countries, getUniversitiesByCountry } from '../constants/universities';
import type { University } from '../constants/universities';

const Universities = () => {
    const { t, i18n } = useTranslation();
    const [activeCountry, setActiveCountry] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const currentLang = i18n.language || 'ar';
    const filteredByCountry = getUniversitiesByCountry(activeCountry);

    const filteredUniversities = filteredByCountry.filter(uni => {
        const name = uni.name[currentLang] || uni.name['en'] || '';
        const city = uni.city[currentLang] || uni.city['en'] || '';
        const desc = uni.description[currentLang] || uni.description['en'] || '';
        const query = searchQuery.toLowerCase();
        return name.toLowerCase().includes(query)
            || city.toLowerCase().includes(query)
            || desc.toLowerCase().includes(query)
            || uni.specialties.some(s => s.toLowerCase().includes(query));
    });

    const getLocalizedText = (field: Record<string, string>) => {
        return field[currentLang] || field['en'] || field['ar'] || '';
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={t('header.universities') || (currentLang === 'ar' ? 'جامعاتنا' : 'Our Universities')}
                description={currentLang === 'ar' ? 'تعرف على الجامعات الشريكة لإيفرست التعليمية في مختلف دول العالم' : 'Discover Everest Education partner universities worldwide'}
            />

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop")',
                        backgroundPosition: 'center 30%'
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#001D4A]/80 z-10"></div>

                <Container className="relative z-20 text-center">
                    <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm bg-white/5">
                        <nav className="text-sm font-medium flex items-center justify-center gap-2" aria-label="Breadcrumb">
                            <Link to="/" className="text-white/70 hover:text-white transition-colors">{t('header.home')}</Link>
                            <span className="text-[#FF822E]">/</span>
                            <span className="text-[#FF822E] font-semibold">{t('header.universities')}</span>
                        </nav>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-['Tajawal'] leading-tight">
                        {currentLang === 'ar' ? 'جامعاتنا الشريكة' : currentLang === 'fa' ? 'دانشگاه‌های ما' : currentLang === 'ru' ? 'Наши университеты' : 'Our Partner Universities'}
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Tajawal'] mb-10">
                        {currentLang === 'ar' ? 'اكتشف أفضل الجامعات الشريكة في مختلف دول العالم. نساعدك في اختيار الجامعة المناسبة لتحقيق أحلامك الأكاديمية.' :
                            currentLang === 'fa' ? 'بهترین دانشگاه‌های شریک ما در سراسر جهان را کشف کنید.' :
                                currentLang === 'ru' ? 'Откройте для себя лучшие университеты-партнёры по всему миру.' :
                                    'Discover the best partner universities around the world. We help you choose the right university to achieve your academic dreams.'}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8 flex-wrap">
                        {[
                            { icon: 'fas fa-university', value: `${universities.length}+`, label: currentLang === 'ar' ? 'جامعة شريكة' : 'Partner Universities' },
                            { icon: 'fas fa-globe', value: `${countries.length - 1}+`, label: currentLang === 'ar' ? 'دولة' : 'Countries' },
                            { icon: 'fas fa-graduation-cap', value: '50+', label: currentLang === 'ar' ? 'تخصص متاح' : 'Specialties' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
                                <i className={`${stat.icon} text-[#FF822E] text-xl mb-2 block`}></i>
                                <div className="text-3xl font-black text-white font-['Tajawal']">{stat.value}</div>
                                <div className="text-sm text-white/70 font-['Tajawal']">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Container>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-16 bg-white relative">
                <div className="absolute top-0 left-0 w-80 h-80 bg-[#FF822E]/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/4 pointer-events-none"></div>

                <Container size="xl">
                    {/* Search */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={currentLang === 'ar' ? 'ابحث عن جامعة...' : currentLang === 'fa' ? 'جستجوی دانشگاه...' : currentLang === 'ru' ? 'Поиск университета...' : 'Search for a university...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#0859BC] focus:outline-none text-lg font-['Tajawal'] bg-gray-50/50 transition-all shadow-sm focus:shadow-lg pr-14"
                            />
                            <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                        </div>
                    </div>

                    {/* Country Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {countries.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => setActiveCountry(country.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 font-['Tajawal'] ${activeCountry === country.id
                                    ? 'bg-[#0859BC] text-white shadow-lg shadow-[#0859BC]/30 scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                    }`}
                            >
                                <span className="text-lg">{country.flag}</span>
                                {country.name[currentLang] || country.name['en']}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="text-center mb-10">
                        <p className="text-gray-500 font-['Tajawal']">
                            {currentLang === 'ar' ? <>عرض <span className="text-[#0859BC] font-bold">{filteredUniversities.length}</span> جامعة</> :
                                currentLang === 'fa' ? <><span className="text-[#0859BC] font-bold">{filteredUniversities.length}</span> دانشگاه</> :
                                    currentLang === 'ru' ? <><span className="text-[#0859BC] font-bold">{filteredUniversities.length}</span> университетов</> :
                                        <>Showing <span className="text-[#0859BC] font-bold">{filteredUniversities.length}</span> universities</>}
                        </p>
                    </div>

                    {/* University Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredUniversities.map((uni: University) => {
                            const countryObj = countries.find(c => c.id === uni.country);
                            return (
                                <Link
                                    to={`/universities/${uni.id}`}
                                    key={uni.id}
                                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="h-52 overflow-hidden relative">
                                        <img
                                            src={uni.image}
                                            alt={getLocalizedText(uni.name)}
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                        {/* Country Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-full font-['Tajawal'] bg-white/90 text-[#203252] backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                                                <span>{countryObj?.flag}</span>
                                                {countryObj ? (countryObj.name[currentLang] || countryObj.name['en']) : ''}
                                            </span>
                                        </div>

                                        {/* Featured Badge */}
                                        {uni.featured && (
                                            <div className="absolute top-4 left-4">
                                                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FF822E] text-white shadow-md">
                                                    <i className="fas fa-star ml-1"></i>
                                                    {currentLang === 'ar' ? 'مميزة' : 'Featured'}
                                                </span>
                                            </div>
                                        )}

                                        {/* Logo overlay */}
                                        <div className="absolute bottom-4 right-4">
                                            <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
                                                <img
                                                    src={uni.logo}
                                                    alt={`${getLocalizedText(uni.name)} logo`}
                                                    className="w-full h-full object-contain"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Name & City */}
                                        <h3 className="text-lg font-bold text-[#203252] mb-1 font-['Tajawal'] group-hover:text-[#0859BC] transition-colors leading-relaxed">
                                            {getLocalizedText(uni.name)}
                                        </h3>
                                        <p className="text-sm text-gray-400 font-['Tajawal'] mb-3 flex items-center gap-1">
                                            <i className="fas fa-map-marker-alt text-[#FF822E] text-xs"></i>
                                            {getLocalizedText(uni.city)}
                                            {uni.established && (
                                                <span className="mx-2 text-gray-300">•</span>
                                            )}
                                            {uni.established && (
                                                <span className="flex items-center gap-1">
                                                    <i className="fas fa-calendar text-[#0859BC] text-xs"></i>
                                                    {currentLang === 'ar' ? `تأسست ${uni.established}` : `Est. ${uni.established}`}
                                                </span>
                                            )}
                                        </p>

                                        {/* Description */}
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 font-['Tajawal'] line-clamp-2 flex-1">
                                            {getLocalizedText(uni.description)}
                                        </p>

                                        {/* Info Row */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {uni.ranking && (
                                                <div className="bg-[#EBF5FF] rounded-xl px-3 py-2 text-center">
                                                    <i className="fas fa-trophy text-[#0859BC] text-xs block mb-1"></i>
                                                    <span className="text-xs font-bold text-[#0859BC] font-['Tajawal']">{uni.ranking}</span>
                                                </div>
                                            )}
                                            <div className="bg-[#FFF5EB] rounded-xl px-3 py-2 text-center">
                                                <i className="fas fa-coins text-[#FF822E] text-xs block mb-1"></i>
                                                <span className="text-xs font-bold text-[#FF822E] font-['Tajawal']">{getLocalizedText(uni.tuitionRange)}</span>
                                            </div>
                                        </div>

                                        {/* Languages */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {uni.languages.map((lang, idx) => (
                                                <span key={idx} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-['Tajawal']">
                                                    <i className="fas fa-language ml-1 text-[#0859BC]"></i>
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            {uni.website && (
                                                <a
                                                    href={uni.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#0859BC] font-bold text-sm font-['Tajawal'] hover:underline flex items-center gap-2"
                                                >
                                                    <i className="fas fa-external-link-alt text-xs"></i>
                                                    {currentLang === 'ar' ? 'الموقع الرسمي' : 'Visit Website'}
                                                </a>
                                            )}
                                            <a
                                                href={`https://wa.me/905555555555?text=${encodeURIComponent(currentLang === 'ar' ? `أرغب بالاستفسار عن جامعة ${getLocalizedText(uni.name)}` : `I want to inquire about ${getLocalizedText(uni.name)}`)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-[#FF822E] hover:bg-[#e0701f] text-white text-sm px-5 py-2.5 rounded-xl font-bold font-['Tajawal'] transition-all hover:shadow-md flex items-center gap-2"
                                            >
                                                <i className="fab fa-whatsapp"></i>
                                                {currentLang === 'ar' ? 'استفسر الآن' : 'Inquire'}
                                            </a>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* No Results */}
                    {filteredUniversities.length === 0 && (
                        <div className="text-center py-20">
                            <i className="fas fa-university text-6xl text-gray-200 mb-6 block"></i>
                            <h3 className="text-2xl font-bold text-gray-400 mb-3 font-['Tajawal']">
                                {currentLang === 'ar' ? 'لم يتم العثور على جامعات' : 'No universities found'}
                            </h3>
                            <p className="text-gray-400 font-['Tajawal']">
                                {currentLang === 'ar' ? 'حاول تغيير كلمات البحث أو الفلتر' : 'Try changing your search or filter'}
                            </p>
                        </div>
                    )}
                </Container>
            </section>

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default Universities;
