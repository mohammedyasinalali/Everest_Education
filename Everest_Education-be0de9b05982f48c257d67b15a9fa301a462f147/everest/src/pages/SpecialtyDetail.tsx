import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { allSpecialties } from '../constants/specialties';
import SEO from '../components/SEO';

const SpecialtyDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const specialty = allSpecialties.find(spec => spec.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!specialty) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{t('search_filter.specialty_detail.not_found')}</h2>
                    <Link to="/specialties" className="text-[#0859BC] hover:underline">
                        {t('search_filter.specialty_detail.back')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={`${t('header.specialties')} | ${specialty.name}`}
                description={specialty.description}
                keywords={[specialty.name, specialty.nameEn, t('header.home'), specialty.category]}
                image={specialty.image}
            />
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20 text-white overflow-hidden">
                <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D4A] via-[#001D4A]/60 to-transparent z-10"></div>

                <Container className="relative z-20">
                    <div className="flex flex-col md:flex-row items-end gap-8">
                        {/* Icon Box */}
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-white text-4xl md:text-5xl shadow-2xl border-4 border-white transform translate-y-8"
                            style={{ backgroundColor: specialty.color }}
                        >
                            <i className={specialty.icon}></i>
                        </div>

                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`text-xs md:text-sm font-bold px-4 py-1.5 rounded-full font-['Tajawal'] ${specialty.category === 'bachelor' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-100' :
                                    specialty.category === 'master' ? 'bg-purple-500/20 border border-purple-400/30 text-purple-100' :
                                        specialty.category === 'phd' ? 'bg-amber-500/20 border border-amber-400/30 text-amber-100' :
                                            'bg-green-500/20 border border-green-400/30 text-green-100'
                                    }`}>
                                    {specialty.category === 'bachelor' ? t('search_filter.categories.bachelor') :
                                        specialty.category === 'master' ? t('search_filter.categories.master') :
                                            specialty.category === 'phd' ? t('search_filter.categories.phd') : t('search_filter.categories.diploma')}
                                </span>
                                <span className="text-white/60 text-sm font-['Montserrat'] font-medium tracking-wide">
                                    {specialty.nameEn}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black font-['Tajawal'] mb-4 leading-tight">
                                {specialty.name}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-sm md:text-base font-['Tajawal'] text-white/90">
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-clock text-[#FF822E]"></i>
                                    {specialty.duration}
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-language text-[#FF822E]"></i>
                                    {specialty.language}
                                </span>
                            </div>
                        </div>

                        <div className="hidden md:block mb-6">
                            <button
                                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#FF822E] hover:bg-[#e0701f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl font-['Tajawal'] flex items-center gap-2"
                            >
                                <i className="fas fa-paper-plane"></i>
                                {t('search_filter.specialty_detail.register_now')}
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-[#203252] mb-6 font-['Tajawal'] border-b border-gray-100 pb-4">
                                    {t('search_filter.specialty_detail.about')}
                                </h3>
                                <p className="text-gray-600 leading-loose font-['Tajawal'] text-lg">
                                    {specialty.description}
                                    <br /><br />
                                    {t('search_filter.specialty_detail.about_desc', { name: specialty.name })}
                                </p>
                            </div>

                            {/* Why Study This */}
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-[#203252] mb-6 font-['Tajawal'] border-b border-gray-100 pb-4">
                                    {t('search_filter.specialty_detail.why_study_here', { name: specialty.name })}
                                </h3>
                                <ul className="space-y-4 font-['Tajawal']">
                                    {(t('search_filter.specialty_detail.advantages', { returnObjects: true }) as string[]).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="min-w-[24px] h-6 rounded-full bg-[#EBF5FF] flex items-center justify-center mt-1">
                                                <i className="fas fa-check text-[#0859BC] text-xs"></i>
                                            </div>
                                            <span className="text-gray-600 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Quick Info Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-32">
                                <h3 className="text-xl font-bold text-[#203252] mb-6 font-['Tajawal']">{t('search_filter.specialty_detail.quick_info')}</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#0859BC] text-xl">
                                            <i className="fas fa-graduation-cap"></i>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-['Tajawal'] mb-1">{t('search_filter.specialty_detail.degree')}</div>
                                            <div className="font-bold text-[#203252] font-['Tajawal']">
                                                {specialty.category === 'bachelor' ? t('search_filter.categories.bachelor') :
                                                    specialty.category === 'master' ? t('search_filter.categories.master') :
                                                        specialty.category === 'phd' ? t('search_filter.categories.phd') : t('search_filter.categories.diploma')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#E67E22] text-xl">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-['Tajawal'] mb-1">{t('search_filter.specialty_detail.duration')}</div>
                                            <div className="font-bold text-[#203252] font-['Tajawal']">{specialty.duration}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-[#16A085] text-xl">
                                            <i className="fas fa-language"></i>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-['Tajawal'] mb-1">{t('search_filter.specialty_detail.language_study')}</div>
                                            <div className="font-bold text-[#203252] font-['Tajawal']">{specialty.language}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                    <p className="text-gray-500 text-sm mb-4 font-['Tajawal']">{t('search_filter.specialty_detail.have_question')}</p>
                                    <a
                                        href="https://wa.me/905555555555"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl font-['Tajawal'] flex items-center justify-center gap-2 group"
                                    >
                                        <i className="fab fa-whatsapp text-xl"></i>
                                        {t('search_filter.specialty_detail.whatsapp_contact')}
                                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Application CTA */}
            <section id="contact-form" className="py-20 bg-white">
                <Container>
                    <div className="bg-[#0859BC] rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center text-white">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF822E]/20 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                        <h2 className="text-3xl md:text-5xl font-black mb-6 font-['Tajawal'] relative z-10">
                            {t('search_filter.specialty_detail.start_journey', { name: specialty.name })}
                        </h2>
                        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-['Tajawal'] relative z-10">
                            {t('search_filter.specialty_detail.journey_desc')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                            <a href="#" className="bg-white text-[#0859BC] px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all font-['Tajawal']">
                                <i className="fas fa-file-alt ml-2"></i>
                                {t('search_filter.specialty_detail.apply_now')}
                            </a>
                            <a href="#" className="bg-[#FF822E] text-white px-10 py-4 rounded-full font-bold hover:bg-[#e0701f] hover:shadow-xl transition-all font-['Tajawal']">
                                <i className="fas fa-headset ml-2"></i>
                                {t('search_filter.specialty_detail.talk_consultant')}
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

export default SpecialtyDetail;
