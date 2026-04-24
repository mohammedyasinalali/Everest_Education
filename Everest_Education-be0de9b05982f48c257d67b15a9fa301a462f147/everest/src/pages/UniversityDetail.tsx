import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { getUniversityById, universities, countries } from '../constants/universities';
import type { University, Faculty } from '../constants/universities';

const UniversityDetail = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'ar';
    const [activeSection, setActiveSection] = useState('about');

    const uni = getUniversityById(id || '');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'video', 'vision', 'mission', 'advantages', 'faculties', 'admission', 'tuition', 'related'];
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom > 150) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLocalizedText = (field?: Record<string, string>) => {
        if (!field) return '';
        return field[currentLang] || field['en'] || field['ar'] || '';
    };

    const getLocalizedList = (field?: Record<string, string[]>) => {
        if (!field) return [];
        return field[currentLang] || field['en'] || field['ar'] || [];
    };

    const scrollToSection = (sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            const offset = 100;
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (!uni) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-university text-6xl text-gray-200 mb-6 block"></i>
                    <h2 className="text-2xl font-bold mb-4 font-['Tajawal'] text-[#203252]">
                        {currentLang === 'ar' ? 'الجامعة غير موجودة' : 'University not found'}
                    </h2>
                    <Link to="/universities" className="text-[#0859BC] hover:underline font-['Tajawal'] font-bold">
                        {currentLang === 'ar' ? 'العودة إلى الجامعات' : 'Back to Universities'}
                    </Link>
                </div>
            </div>
        );
    }

    const countryObj = countries.find(c => c.id === uni.country);

    // Generate table of contents based on available data
    const tocItems = [
        { id: 'about', icon: 'fas fa-info-circle', label: currentLang === 'ar' ? 'عن الجامعة' : 'About' },
        ...(uni.videoUrl ? [{ id: 'video', icon: 'fas fa-play-circle', label: currentLang === 'ar' ? 'فيديو/ علم الجامعة' : 'Video' }] : []),
        ...(uni.vision ? [{ id: 'vision', icon: 'fas fa-eye', label: currentLang === 'ar' ? 'رؤية الجامعة' : 'Vision' }] : []),
        ...(uni.mission ? [{ id: 'mission', icon: 'fas fa-bullseye', label: currentLang === 'ar' ? 'مهمة الجامعة' : 'Mission' }] : []),
        ...(uni.advantages ? [{ id: 'advantages', icon: 'fas fa-star', label: currentLang === 'ar' ? 'مميزات الدراسة' : 'Advantages' }] : []),
        ...(uni.faculties && uni.faculties.length > 0 ? [{ id: 'faculties', icon: 'fas fa-building-columns', label: currentLang === 'ar' ? 'كليات و تخصصات' : 'Faculties' }] : []),
        ...(uni.admissionRequirements ? [{ id: 'admission', icon: 'fas fa-file-alt', label: currentLang === 'ar' ? 'كيفية التقديم والتسجيل' : 'Admission' }] : []),
        { id: 'tuition', icon: 'fas fa-coins', label: currentLang === 'ar' ? 'الرسوم الدراسية' : 'Tuition' },
        { id: 'related', icon: 'fas fa-university', label: currentLang === 'ar' ? 'جامعات أخرى' : 'Other Universities' },
    ];

    // Related universities: same country, different id
    const relatedUnis = universities
        .filter(u => u.country === uni.country && u.id !== uni.id)
        .slice(0, 6);

    // If not enough from same country, add featured ones
    const additionalUnis = relatedUnis.length < 4
        ? universities.filter(u => u.id !== uni.id && u.country !== uni.country && u.featured).slice(0, 6 - relatedUnis.length)
        : [];

    const allRelated = [...relatedUnis, ...additionalUnis];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={getLocalizedText(uni.name)}
                description={getLocalizedText(uni.description)}
            />

            {/* Hero Section */}
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
                                {countryObj && (
                                    <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                        <span>{countryObj.flag}</span>
                                        {countryObj.name[currentLang] || countryObj.name['en']}
                                    </span>
                                )}
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
                            href={`https://wa.me/905555555555?text=${encodeURIComponent(currentLang === 'ar' ? `أرغب بالاستفسار عن جامعة ${getLocalizedText(uni.name)}` : `I want to inquire about ${getLocalizedText(uni.name)}`)}`}
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

            {/* Main Content */}
            <section className="py-12 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Sidebar - Table of Contents */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
                                <h3 className="text-lg font-bold text-[#203252] mb-5 font-['Tajawal'] flex items-center gap-2">
                                    <i className="fas fa-list text-[#0859BC]"></i>
                                    {currentLang === 'ar' ? 'جدول المحتوى' : 'Table of Contents'}
                                </h3>
                                <nav className="space-y-1">
                                    {tocItems.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`w-full text-right flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-['Tajawal'] transition-all ${activeSection === item.id
                                                ? 'bg-[#EBF5FF] text-[#0859BC] font-bold'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#203252]'
                                                }`}
                                        >
                                            <i className={`${item.icon} text-xs ${activeSection === item.id ? 'text-[#0859BC]' : 'text-gray-400'}`}></i>
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>

                                {/* Quick Contact */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <a
                                        href={`https://wa.me/905555555555?text=${encodeURIComponent(currentLang === 'ar' ? `أرغب بالاستفسار عن جامعة ${getLocalizedText(uni.name)}` : `I want to inquire about ${getLocalizedText(uni.name)}`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full bg-[#FF822E] hover:bg-[#e0701f] text-white py-3 rounded-xl font-bold font-['Tajawal'] transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <i className="fab fa-whatsapp text-lg"></i>
                                        {currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 order-2 lg:order-1 space-y-10">

                            {/* About Section */}
                            <section id="about" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                    <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                        <i className="fas fa-info-circle text-[#0859BC]"></i>
                                    </span>
                                    {currentLang === 'ar' ? `تعرف على ${getLocalizedText(uni.name)}` : `About ${uni.name['en'] || getLocalizedText(uni.name)}`}
                                </h2>
                                <div className="text-gray-600 leading-loose font-['Tajawal'] text-base space-y-4">
                                    <p>{getLocalizedText(uni.aboutContent) || getLocalizedText(uni.description)}</p>
                                    {!uni.aboutContent && (
                                        <p>
                                            {currentLang === 'ar'
                                                ? `تقع الجامعة في مدينة ${getLocalizedText(uni.city)}، وتأسست عام ${uni.established}م. تستقبل الجامعة أكثر من ${uni.studentsCount || '10,000'} طالب من مختلف أنحاء العالم. تقدم الجامعة برامج أكاديمية متنوعة في مجالات ${uni.specialties.join('، ')}. لغات التدريس في الجامعة تشمل: ${uni.languages.join('، ')}.`
                                                : `Located in ${getLocalizedText(uni.city)}, established in ${uni.established}. The university hosts over ${uni.studentsCount || '10,000'} students from around the world. It offers diverse academic programs in ${uni.specialties.join(', ')}. Teaching languages include: ${uni.languages.join(', ')}.`
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Quick Stats Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    {[
                                        { icon: 'fas fa-calendar-check', value: `${uni.established}`, label: currentLang === 'ar' ? 'سنة التأسيس' : 'Established', color: '#0859BC' },
                                        { icon: 'fas fa-users', value: uni.studentsCount || '10,000+', label: currentLang === 'ar' ? 'عدد الطلاب' : 'Students', color: '#FF822E' },
                                        ...(uni.ranking ? [{ icon: 'fas fa-trophy', value: uni.ranking, label: currentLang === 'ar' ? 'التصنيف' : 'Ranking', color: '#10B981' }] : []),
                                        { icon: 'fas fa-language', value: uni.languages.join(' / '), label: currentLang === 'ar' ? 'لغات التدريس' : 'Languages', color: '#8B5CF6' },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-2xl p-4 text-center">
                                            <i className={`${stat.icon} text-2xl mb-2 block`} style={{ color: stat.color }}></i>
                                            <div className="text-sm font-bold text-[#203252] font-['Tajawal']">{stat.value}</div>
                                            <div className="text-xs text-gray-400 font-['Tajawal'] mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Video Section */}
                            {uni.videoUrl && (
                                <section id="video" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-play-circle text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? 'فيديو تعريفي' : 'Introductory Video'}
                                    </h2>
                                    <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                                        <iframe
                                            src={uni.videoUrl}
                                            title={getLocalizedText(uni.name)}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </section>
                            )}

                            {/* Gallery Section */}
                            {uni.gallery && uni.gallery.length > 0 && (
                                <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-images text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? 'صور الجامعة' : 'Campus Gallery'}
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {uni.gallery.map((img, idx) => (
                                            <div key={idx} className="rounded-2xl overflow-hidden h-48 group">
                                                <img src={img} alt={`${getLocalizedText(uni.name)} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Vision Section */}
                            {uni.vision && (
                                <section id="vision" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-eye text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? 'رؤية الجامعة' : 'University Vision'}
                                    </h2>
                                    <p className="text-gray-600 leading-loose font-['Tajawal'] text-base">{getLocalizedText(uni.vision)}</p>
                                </section>
                            )}

                            {/* Mission Section */}
                            {uni.mission && (
                                <section id="mission" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-bullseye text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? 'مهمة الجامعة' : 'University Mission'}
                                    </h2>
                                    <p className="text-gray-600 leading-loose font-['Tajawal'] text-base">{getLocalizedText(uni.mission)}</p>
                                </section>
                            )}

                            {/* Advantages Section */}
                            {uni.advantages && (
                                <section id="advantages" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#FFF5EB] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-star text-[#FF822E]"></i>
                                        </span>
                                        {currentLang === 'ar' ? `مميزات الدراسة في ${getLocalizedText(uni.name)}` : `Advantages of Studying at ${uni.name['en'] || getLocalizedText(uni.name)}`}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {getLocalizedList(uni.advantages).map((adv, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                                <div className="w-8 h-8 bg-[#EBF5FF] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    <i className="fas fa-check text-[#0859BC] text-xs"></i>
                                                </div>
                                                <p className="text-gray-600 font-['Tajawal'] text-sm leading-relaxed">{adv}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Faculties Section */}
                            {uni.faculties && uni.faculties.length > 0 && (
                                <section id="faculties" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-building-columns text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? `كليات و تخصصات ${getLocalizedText(uni.name)}` : `Faculties & Programs`}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {uni.faculties.map((faculty: Faculty, fidx: number) => (
                                            <div key={fidx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#0859BC]/30 transition-colors">
                                                <h3 className="text-base font-bold text-[#203252] mb-4 font-['Tajawal'] flex items-center gap-2">
                                                    <i className="fas fa-graduation-cap text-[#FF822E] text-sm"></i>
                                                    {getLocalizedText(faculty.name)}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {faculty.departments.map((dept, didx) => (
                                                        <li key={didx} className="text-sm text-gray-500 font-['Tajawal'] flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-[#0859BC] rounded-full flex-shrink-0"></span>
                                                            {getLocalizedText(dept)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Admission Requirements Section */}
                            {uni.admissionRequirements && (
                                <section id="admission" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-6 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-file-alt text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? `كيفية التقديم والتسجيل في ${getLocalizedText(uni.name)}` : 'Admission & Registration'}
                                    </h2>

                                    <div className={`grid grid-cols-1 ${uni.admissionRequirements.phd ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
                                        {/* Bachelor */}
                                        {uni.admissionRequirements.bachelor && (
                                            <div className="bg-gradient-to-br from-[#EBF5FF] to-white rounded-2xl p-6 border border-[#0859BC]/10">
                                                <h3 className="text-lg font-bold text-[#0859BC] mb-4 font-['Tajawal'] flex items-center gap-2">
                                                    <i className="fas fa-user-graduate"></i>
                                                    {currentLang === 'ar' ? 'مرحلة البكالوريوس' : "Bachelor's Degree"}
                                                </h3>
                                                <ul className="space-y-3">
                                                    {getLocalizedList(uni.admissionRequirements.bachelor).map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-['Tajawal']">
                                                            <span className="w-6 h-6 bg-[#0859BC] text-white rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{idx + 1}</span>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Master */}
                                        {uni.admissionRequirements.master && (
                                            <div className="bg-gradient-to-br from-[#FFF5EB] to-white rounded-2xl p-6 border border-[#FF822E]/10">
                                                <h3 className="text-lg font-bold text-[#FF822E] mb-4 font-['Tajawal'] flex items-center gap-2">
                                                    <i className="fas fa-award"></i>
                                                    {currentLang === 'ar' ? 'مرحلة الماجستير' : "Master's Degree"}
                                                </h3>
                                                <ul className="space-y-3">
                                                    {getLocalizedList(uni.admissionRequirements.master).map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-['Tajawal']">
                                                            <span className="w-6 h-6 bg-[#FF822E] text-white rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{idx + 1}</span>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* PhD */}
                                        {uni.admissionRequirements.phd && (
                                            <div className="bg-gradient-to-br from-[#ECFDF5] to-white rounded-2xl p-6 border border-[#10B981]/10">
                                                <h3 className="text-lg font-bold text-[#10B981] mb-4 font-['Tajawal'] flex items-center gap-2">
                                                    <i className="fas fa-hat-wizard"></i>
                                                    {currentLang === 'ar' ? 'مرحلة الدكتوراه' : "Doctoral Degree (PhD)"}
                                                </h3>
                                                <ul className="space-y-3">
                                                    {getLocalizedList(uni.admissionRequirements.phd).map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-['Tajawal']">
                                                            <span className="w-6 h-6 bg-[#10B981] text-white rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{idx + 1}</span>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Tuition Section */}
                            <section id="tuition" className="bg-gradient-to-br from-[#0859BC] to-[#064a96] rounded-3xl p-8 md:p-10 shadow-lg text-white">
                                <h2 className="text-2xl font-black mb-6 font-['Tajawal'] flex items-center gap-3">
                                    <span className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                                        <i className="fas fa-coins text-[#FF822E]"></i>
                                    </span>
                                    {currentLang === 'ar' ? 'الرسوم الدراسية' : 'Tuition Fees'}
                                </h2>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <i className="fas fa-money-bill-wave text-3xl text-[#FF822E]"></i>
                                        <div>
                                            <p className="text-white/60 text-sm font-['Tajawal']">
                                                {currentLang === 'ar' ? 'نطاق الرسوم الدراسية السنوية' : 'Annual Tuition Range'}
                                            </p>
                                            <p className="text-2xl font-black font-['Tajawal']">{getLocalizedText(uni.tuitionRange)}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/70 text-sm font-['Tajawal'] leading-relaxed">
                                        {currentLang === 'ar'
                                            ? 'تختلف الرسوم حسب التخصص ولغة الدراسة. تواصل معنا للحصول على تفاصيل دقيقة حول الرسوم والمنح المتاحة.'
                                            : 'Tuition varies by program and language of instruction. Contact us for exact fees and available scholarships.'}
                                    </p>
                                </div>
                                <a
                                    href={`https://wa.me/905555555555?text=${encodeURIComponent(currentLang === 'ar' ? `أريد معرفة تفاصيل الرسوم الدراسية في ${getLocalizedText(uni.name)}` : `I want to know tuition details for ${getLocalizedText(uni.name)}`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 w-full bg-[#FF822E] hover:bg-[#e0701f] text-white py-4 rounded-xl font-bold font-['Tajawal'] transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <i className="fab fa-whatsapp text-xl"></i>
                                    {currentLang === 'ar' ? 'استفسر عن الرسوم والمنح' : 'Inquire About Fees & Scholarships'}
                                </a>
                            </section>

                            {/* Related Universities */}
                            {allRelated.length > 0 && (
                                <section id="related" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-black text-[#0859BC] mb-8 font-['Tajawal'] flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                                            <i className="fas fa-university text-[#0859BC]"></i>
                                        </span>
                                        {currentLang === 'ar' ? 'جامعات أخرى' : 'Other Universities'}
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {allRelated.map((relUni: University) => (
                                            <Link
                                                key={relUni.id}
                                                to={`/universities/${relUni.id}`}
                                                className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#EBF5FF] transition-all hover:shadow-md border border-transparent hover:border-[#0859BC]/20"
                                            >
                                                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                                                    <img
                                                        src={relUni.logo}
                                                        alt={getLocalizedText(relUni.name)}
                                                        className="w-full h-full object-contain"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                </div>
                                                <h4 className="text-sm font-bold text-[#203252] group-hover:text-[#0859BC] transition-colors font-['Tajawal'] mb-1 line-clamp-2">
                                                    {getLocalizedText(relUni.name)}
                                                </h4>
                                                <p className="text-xs text-gray-400 font-['Tajawal']">
                                                    {getLocalizedText(relUni.city)}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default UniversityDetail;
