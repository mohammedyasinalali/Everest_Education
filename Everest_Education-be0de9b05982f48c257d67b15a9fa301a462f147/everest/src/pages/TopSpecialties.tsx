import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';

// Categories for filter tabs (moved inside component to use translation)

import { allSpecialties } from '../constants/specialties';
import SEO from '../components/SEO';

const TopSpecialties = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: t('search_filter.categories.all'), icon: 'fas fa-th-large' },
        { id: 'bachelor', label: t('search_filter.categories.bachelor'), icon: 'fas fa-graduation-cap' },
        { id: 'master', label: t('search_filter.categories.master'), icon: 'fas fa-user-graduate' },
        { id: 'phd', label: t('search_filter.categories.phd'), icon: 'fas fa-award' },
        { id: 'diploma', label: t('search_filter.categories.diploma'), icon: 'fas fa-certificate' },
        { id: 'medical', label: t('search_filter.categories.medical'), icon: 'fas fa-heartbeat' },
        { id: 'engineering', label: t('search_filter.categories.engineering'), icon: 'fas fa-cogs' },
    ];

    const filteredSpecialties = allSpecialties.filter(spec => {
        const matchesCategory = activeFilter === 'all'
            || spec.category === activeFilter
            || (activeFilter === 'medical' && spec.tags.includes('medical'))
            || (activeFilter === 'engineering' && spec.tags.includes('engineering'));
        const matchesSearch = spec.name.includes(searchQuery) || spec.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const stats = [
        { number: '70+', label: t('search_filter.stats.specialties_available'), icon: 'fas fa-book-open' },
        { number: '50+', label: t('search_filter.stats.partner_universities'), icon: 'fas fa-university' },
        { number: '100%', label: t('search_filter.stats.guaranteed_admission'), icon: 'fas fa-check-circle' },
        { number: '24/7', label: t('search_filter.stats.continuous_support'), icon: 'fas fa-headset' },
    ];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={t('header.specialties')}
                description="اكتشف أبرز التخصصات الجامعية المتاحة في الجامعات التركية الخاصة."
            />
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2666&auto=format&fit=crop")',
                        backgroundPosition: 'center 40%'
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#001D4A]/75 z-10"></div>

                <Container className="relative z-20 text-center">
                    <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm bg-white/5">
                        <nav className="text-sm font-medium flex items-center justify-center gap-2" aria-label="Breadcrumb">
                            <span className="text-white/70">{t('header.home')}</span>
                            <span className="text-secondary">/</span>
                            <span className="text-secondary font-semibold">{t('header.specialties')}</span>
                        </nav>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-['Tajawal'] leading-tight">
                        أهم <span className="text-[#FF822E]">التخصصات</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Tajawal'] mb-10">
                        اكتشف أبرز التخصصات الجامعية المتاحة في الجامعات التركية الخاصة. من الطب والهندسة إلى إدارة الأعمال والتكنولوجيا
                    </p>

                    {/* Hero Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
                                <i className={`${stat.icon} text-[#FF822E] text-2xl mb-3 block group-hover:scale-110 transition-transform`}></i>
                                <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                                <div className="text-white/70 text-sm font-['Tajawal']">{stat.label}</div>
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

            {/* Search & Filter Section */}
            <section className="py-16 bg-white relative">
                <div className="absolute top-0 left-0 w-80 h-80 bg-[#FF822E]/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/4 pointer-events-none"></div>

                <Container size="xl">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t('search_filter.search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#0859BC] focus:outline-none text-lg font-['Tajawal'] bg-gray-50/50 transition-all shadow-sm focus:shadow-lg pr-14"
                            />
                            <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 font-['Tajawal'] ${activeFilter === cat.id
                                    ? 'bg-[#0859BC] text-white shadow-lg shadow-[#0859BC]/30 scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                    }`}
                            >
                                <i className={`${cat.icon} text-sm`}></i>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="text-center mb-10">
                        <p className="text-gray-500 font-['Tajawal']">
                            {t('search_filter.showing_results')} <span className="text-[#0859BC] font-bold">{filteredSpecialties.length}</span> {t('search_filter.specialties_count')}
                        </p>
                    </div>

                    {/* Specialties Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSpecialties.map((spec) => (
                            <div
                                key={spec.id}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full"
                            >
                                {/* Image with Overlay */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={spec.image}
                                        alt={spec.name}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full font-['Tajawal'] shadow-md ${spec.category === 'bachelor' ? 'bg-blue-600 text-white' :
                                            spec.category === 'master' ? 'bg-purple-600 text-white' :
                                                spec.category === 'phd' ? 'bg-amber-600 text-white' :
                                                    'bg-green-600 text-white'
                                            }`}>
                                            {spec.category === 'bachelor' ? t('search_filter.categories.bachelor') :
                                                spec.category === 'master' ? t('search_filter.categories.master') :
                                                    spec.category === 'phd' ? t('search_filter.categories.phd') : t('search_filter.categories.diploma')}
                                        </span>
                                    </div>
                                    {/* Icon Floating */}
                                    <div
                                        className="absolute -bottom-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg border-2 border-white"
                                        style={{ backgroundColor: spec.color }}
                                    >
                                        <i className={spec.icon}></i>
                                    </div>
                                </div>

                                <div className="p-6 pt-10 flex-1 flex flex-col">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-[#203252] mb-1 font-['Tajawal'] group-hover:text-[#0859BC] transition-colors">
                                        {spec.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-3 font-['Montserrat'] font-semibold">{spec.nameEn}</p>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 font-['Tajawal'] line-clamp-2 flex-1">
                                        {spec.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-['Tajawal'] border-t border-gray-100 pt-4">
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-clock text-[#FF822E]"></i>
                                            {spec.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-language text-[#FF822E]"></i>
                                            {spec.language}
                                        </span>
                                    </div>

                                    {/* Link CTA */}
                                    <Link
                                        to={`/specialties/${spec.id}`}
                                        className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 font-['Tajawal'] bg-gray-50 text-[#0859BC] group-hover:bg-[#0859BC] group-hover:text-white group-hover:shadow-lg text-center block"
                                    >
                                        {t('search_filter.view_details')}
                                        <i className="fas fa-arrow-left mr-2 group-hover:translate-x-[-4px] transition-transform inline-block"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredSpecialties.length === 0 && (
                        <div className="text-center py-20">
                            <i className="fas fa-search text-6xl text-gray-200 mb-6 block"></i>
                            <h3 className="text-2xl font-bold text-gray-400 mb-3 font-['Tajawal']">{t('search_filter.no_results.title')}</h3>
                            <p className="text-gray-400 font-['Tajawal']">{t('search_filter.no_results.desc')}</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* Why Study in Turkey Section */}
            <section className="py-24 bg-gradient-to-br from-[#001D4A] to-[#0859BC] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF822E]/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <Container size="xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6">
                            <i className="fas fa-star text-[#FF822E] text-sm"></i>
                            <span className="text-sm font-bold font-['Tajawal']">{t('search_filter.why_turkey.badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-['Tajawal']">
                            {t('search_filter.why_turkey.title')}
                        </h2>
                        <div className="w-20 h-1.5 bg-[#FF822E] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: 'fas fa-medal', title: t('search_filter.why_turkey.features.quality.title'), desc: t('search_filter.why_turkey.features.quality.desc') },
                            { icon: 'fas fa-hand-holding-usd', title: t('search_filter.why_turkey.features.cost.title'), desc: t('search_filter.why_turkey.features.cost.desc') },
                            { icon: 'fas fa-passport', title: t('search_filter.why_turkey.features.visa.title'), desc: t('search_filter.why_turkey.features.visa.desc') },
                            { icon: 'fas fa-globe-americas', title: t('search_filter.why_turkey.features.environment.title'), desc: t('search_filter.why_turkey.features.environment.desc') },
                            { icon: 'fas fa-flask', title: t('search_filter.why_turkey.features.labs.title'), desc: t('search_filter.why_turkey.features.labs.desc') },
                            { icon: 'fas fa-handshake', title: t('search_filter.why_turkey.features.jobs.title'), desc: t('search_filter.why_turkey.features.jobs.desc') },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 group hover:-translate-y-1">
                                <div className="w-16 h-16 bg-[#FF822E]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FF822E]/30 transition-colors">
                                    <i className={`${feature.icon} text-[#FF822E] text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-['Tajawal']">{feature.title}</h3>
                                <p className="text-white/70 leading-relaxed font-['Tajawal'] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-10 right-0 w-72 h-72 bg-[#0859BC]/5 rounded-full translate-x-1/3 pointer-events-none"></div>

                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-[#203252] mb-6 font-['Tajawal']">
                            {t('search_filter.cta.not_found')}
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-8 font-['Tajawal']">
                            {t('search_filter.cta.desc')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="bg-[#0859BC] hover:bg-[#064a96] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl font-['Tajawal'] flex items-center gap-2">
                                <i className="fab fa-whatsapp text-xl"></i>
                                {t('search_filter.cta.whatsapp')}
                            </a>
                            <a href="#" className="bg-[#FF822E] hover:bg-[#e0701f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl font-['Tajawal'] flex items-center gap-2">
                                <i className="fas fa-phone-alt"></i>
                                {t('search_filter.cta.consultation')}
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default TopSpecialties;
