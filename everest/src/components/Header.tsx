import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { universities, countries } from '../constants/universities';
import { navLinks } from '../constants/data';

const languages = [
    { code: 'en', name: 'English', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg' },
    { code: 'ar', name: 'العربية', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg' },
    { code: 'fa', name: 'فارسي', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg' },
    { code: 'ru', name: 'Russian', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg' },
];

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showSpecialtiesMega, setShowSpecialtiesMega] = useState(false);
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    // Safety check
    if (!i18n) return null;

    const currentLang = i18n.language || 'ar';
    const isRTL = currentLang.startsWith('ar') || currentLang.startsWith('fa');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setShowLangDropdown(false);
    };


    // Specialties data categorized
    const specialtiesColumns = [
        {
            title: t('mega_menu.bachelor_title'),
            items: [
                t('mega_menu.bachelor.accounting'),
                t('mega_menu.bachelor.ai_engineering'),
                t('mega_menu.bachelor.architecture'),
                t('mega_menu.bachelor.new_media'),
                t('mega_menu.bachelor.psychology'),
                t('mega_menu.bachelor.architectural_eng'),
            ],
        },
        {
            title: t('mega_menu.master_title'),
            items: [
                t('mega_menu.master.industrial_eng'),
                t('mega_menu.master.english_literature'),
                t('mega_menu.master.biomedical_eng'),
                t('mega_menu.master.it'),
                t('mega_menu.master.renewable_energy'),
                t('mega_menu.master.ai_systems'),
            ],
        },
        {
            title: t('mega_menu.phd_title'),
            items: [
                t('mega_menu.phd.dentistry'),
                t('mega_menu.phd.business_admin'),
                t('mega_menu.phd.aerospace_eng'),
                t('mega_menu.phd.political_science'),
                t('mega_menu.phd.navigation_eng'),
            ],
        },
        {
            title: t('mega_menu.diploma_title'),
            items: [
                t('mega_menu.diploma.anesthesia'),
                t('mega_menu.diploma.pharmacy_services'),
                t('mega_menu.diploma.culinary_arts'),
                t('mega_menu.diploma.optics'),
                t('mega_menu.diploma.clinical_labs'),
                t('mega_menu.diploma.computer_programming'),
            ],
        },
    ];

    return (
        <header
            dir={isRTL ? 'rtl' : 'ltr'}
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled
                ? 'bg-white/95 shadow-md py-3 backdrop-blur-md'
                : 'bg-transparent shadow-none py-6'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center relative">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 no-underline group z-[1001] relative">
                    <img
                        src="/images/logo.png"
                        alt="Everest Logo"
                        className={`w-14 h-14 rounded-full border-2 object-cover transition-all duration-300 ${isScrolled ? 'border-white' : 'border-white/20'
                            }`}
                    />
                    <div className="flex flex-col items-start leading-none transition-colors duration-300">
                        <h1 className={`text-xl font-black tracking-wider m-0 uppercase font-['Montserrat'] ${isScrolled ? 'text-[#0859BC]' : 'text-white'
                            }`}>
                            EVEREST
                        </h1>
                        <span className={`text-[0.72rem] font-extrabold tracking-[4px] uppercase mt-1 font-['Montserrat'] ${isScrolled ? 'text-[#FF822E]' : 'text-white/80'
                            }`}>
                            EDUCATION
                        </span>
                    </div>
                </a>

                {/* Navbar */}
                <nav className={`hidden md:block ${isMobileMenuOpen ? 'block' : ''}`}>
                    <ul className="flex gap-8 list-none m-0 p-0 items-center">
                        <li key="home">
                            <Link to="/" className={`font-medium text-base relative transition-colors duration-300 ${location.pathname === '/' ? 'text-[#FF822E]' : isScrolled || showMegaMenu ? 'text-[#0859BC] hover:text-[#FF822E]' : 'text-white hover:text-[#FF822E]'}`}>
                                {t('header.home')}
                            </Link>
                        </li>

                        {/* Mega Menu Item */}
                        <li
                            className="relative py-4"
                            onMouseEnter={() => setShowMegaMenu(true)}
                            onMouseLeave={() => setShowMegaMenu(false)}
                        >
                            <Link
                                to="/universities"
                                className={`font-medium text-base relative transition-colors duration-300 cursor-pointer ${location.pathname.startsWith('/universities') ? 'text-[#FF822E]' : isScrolled || showMegaMenu
                                    ? 'text-[#0859BC] hover:text-[#FF822E]'
                                    : 'text-white hover:text-[#FF822E]'
                                    }`}
                            >
                                {t('header.universities')}
                            </Link>

                            {/* Mega Menu Content */}
                            <div
                                className={`fixed left-0 top-0 w-full bg-white shadow-xl transition-all duration-300 z-[-1] border-t border-gray-100 ${showMegaMenu
                                    ? 'opacity-100 visible translate-y-[80px]'
                                    : 'opacity-0 invisible translate-y-[60px]'
                                    }`}
                                style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
                            >
                                <div className="max-w-[1400px] mx-auto p-8">
                                    <div className="flex gap-8 mb-8">
                                        {/* Image */}
                                        <div className="hidden lg:block w-[280px] flex-shrink-0 rounded-2xl overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
                                                alt="Universities"
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                        {/* Columns by Country */}
                                        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {countries.filter(c => c.id !== 'all').map((country) => {
                                                const countryUnis = universities.filter(u => u.country === country.id);
                                                if (countryUnis.length === 0) return null;
                                                return (
                                                    <div key={country.id}>
                                                        <h4 className="text-[#0859BC] font-bold text-sm mb-4 pb-2 border-b-2 border-[#FF822E] font-['Tajawal'] flex items-center gap-2">
                                                            <span>{country.flag}</span>
                                                            {country.name[currentLang] || country.name['en']}
                                                        </h4>
                                                        <ul className="space-y-3">
                                                            {countryUnis.map((uni) => (
                                                                <li key={uni.id}>
                                                                    <Link
                                                                        to={`/universities/${uni.id}`}
                                                                        onClick={() => setShowMegaMenu(false)}
                                                                        className="text-gray-600 hover:text-[#0859BC] hover:font-bold transition-all text-sm block font-['Tajawal']"
                                                                    >
                                                                        {uni.name[currentLang] || uni.name['en'] || uni.name['ar']}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-center border-t border-gray-100 pt-6">
                                        <Link to="/universities" onClick={() => setShowMegaMenu(false)} className="bg-[#0859BC] text-white px-8 py-3 rounded-full hover:bg-[#064a96] transition-colors font-bold shadow-lg hover:shadow-xl font-['Tajawal']">
                                            {t('header.view_all_universities')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Specialties Mega Menu Item */}
                        <li
                            className="relative py-4"
                            onMouseEnter={() => setShowSpecialtiesMega(true)}
                            onMouseLeave={() => setShowSpecialtiesMega(false)}
                        >
                            <a
                                href="/specialties"
                                className={`font-medium text-base relative transition-colors duration-300 cursor-pointer ${location.pathname.startsWith('/specialties') ? 'text-[#FF822E]' : isScrolled || showSpecialtiesMega
                                    ? 'text-[#0859BC] hover:text-[#FF822E]'
                                    : 'text-white hover:text-[#FF822E]'
                                    }`}
                            >
                                {t('header.specialties')}
                            </a>

                            {/* Specialties Mega Menu Content */}
                            <div
                                className={`fixed left-0 top-0 w-full bg-white shadow-xl transition-all duration-300 z-[-1] border-t border-gray-100 ${showSpecialtiesMega
                                    ? 'opacity-100 visible translate-y-[80px]'
                                    : 'opacity-0 invisible translate-y-[60px]'
                                    }`}
                                style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
                            >
                                <div className="max-w-[1400px] mx-auto p-8">
                                    <div className="flex gap-8 mb-8">
                                        {/* Image */}
                                        <div className="hidden lg:block w-[280px] flex-shrink-0 rounded-2xl overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
                                                alt="Academic Specialties"
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                        {/* Columns */}
                                        <div className={`grid grid-cols-4 gap-8 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {specialtiesColumns.map((col, colIndex) => (
                                                <div key={colIndex}>
                                                    <h4 className="text-[#0859BC] font-bold text-sm mb-4 pb-2 border-b-2 border-[#FF822E] font-['Tajawal']">
                                                        {col.title}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {col.items.map((item, index) => (
                                                            <li key={index}>
                                                                <a href="#" className="text-gray-600 hover:text-[#0859BC] hover:font-bold transition-all text-sm block font-['Tajawal']">
                                                                    {item}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-center border-t border-gray-100 pt-6">
                                        <a href="/specialties" className="bg-[#0859BC] text-white px-8 py-3 rounded-full hover:bg-[#064a96] transition-colors font-bold shadow-lg hover:shadow-xl font-['Tajawal']">
                                            {t('mega_menu.view_all_specialties')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>


                        {navLinks.filter(link =>
                            link.label !== 'header.home' &&
                            link.label !== 'header.universities' &&
                            link.label !== 'header.specialties' &&
                            link.label !== 'header.about_us'
                        ).map((link, index) => (
                            <li key={index}>
                                <Link
                                    to={link.href}
                                    className={`font-medium text-base relative transition-colors duration-300 ${location.pathname === link.href ? 'text-[#FF822E]' : isScrolled
                                        ? 'text-[#0859BC] hover:text-[#FF822E]'
                                        : 'text-white hover:text-[#FF822E]'
                                        }`}
                                >
                                    {t(link.label)}
                                </Link>
                            </li>
                        ))}

                        <li key="about">
                            <Link to="/about" className={`font-medium text-base relative transition-colors duration-300 ${location.pathname === '/about' ? 'text-[#FF822E]' : isScrolled || showMegaMenu ? 'text-[#0859BC] hover:text-[#FF822E]' : 'text-white hover:text-[#FF822E]'}`}>
                                {t('header.about_us')}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Left Side: Language & Social (Visible on Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Language Selector */}
                    <div
                        className="relative z-50"
                        onMouseEnter={() => setShowLangDropdown(true)}
                        onMouseLeave={() => setShowLangDropdown(false)}
                    >
                        <button className={`flex items-center gap-2 font-bold transition-all duration-300 ${isScrolled ? 'text-[#0859BC]' : 'text-white'}`}>
                            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 shadow-md transition-all ${isScrolled ? 'border-white shadow-gray-200' : 'border-white/30'}`}>
                                <img
                                    src={languages.find(l => currentLang.startsWith(l.code))?.flag || languages[0].flag}
                                    alt={currentLang}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${showLangDropdown ? 'rotate-180' : ''}`}></i>
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`absolute top-full left-0 mt-4 w-40 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300 transform origin-top-left border border-gray-100 ${showLangDropdown
                                ? 'opacity-100 visible translate-y-0'
                                : 'opacity-0 invisible -translate-y-2'
                                }`}
                        >
                            <div className="p-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all group ${currentLang === lang.code ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <img src={lang.flag} alt={lang.code} className="w-6 h-6 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform" />
                                        <span className={`text-sm font-bold font-['Montserrat'] ${currentLang === lang.code ? 'text-[#0859BC]' : 'text-gray-600 group-hover:text-[#0859BC]'}`}>
                                            {lang.code.toUpperCase()}
                                        </span>
                                        {currentLang === lang.code && (
                                            <i className="fas fa-check text-[10px] text-[#0859BC] mr-auto"></i>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="#" className="bg-[#0859BC] hover:bg-[#064a96] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm">
                        <i className="far fa-user"></i>
                        {t('header.student_platform')}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div
                    className={`block md:hidden text-2xl cursor-pointer transition-all duration-300 z-[1001] relative ${isScrolled ? 'text-[#0859BC]' : 'text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between">
                        <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isScrolled ? 'bg-[#0859BC]' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                        <span className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-[#0859BC]' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
                        <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isScrolled ? 'bg-[#0859BC]' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <div
                className={`md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[998] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ top: '80px' }}
            />

            {/* Mobile Menu */}
            <nav
                className={`md:hidden fixed top-[80px] left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100 z-[999] transition-all duration-400 ease-out overflow-y-auto ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0 max-h-[calc(100vh-80px)]'
                    : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'
                    }`}
                style={{ transitionProperty: 'opacity, transform, max-height' }}
            >
                <div className="p-6">
                    <ul className={`flex flex-col gap-1 list-none m-0 p-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {[
                            { to: '/', label: t('header.home'), match: location.pathname === '/' },
                            { to: '/universities', label: t('header.universities'), match: location.pathname.startsWith('/universities') },
                            { to: '/specialties', label: t('header.specialties'), match: location.pathname.startsWith('/specialties') },
                            ...navLinks.filter(link =>
                                link.label !== 'header.home' &&
                                link.label !== 'header.universities' &&
                                link.label !== 'header.specialties' &&
                                link.label !== 'header.about_us'
                            ).map(link => ({ to: link.href, label: t(link.label), match: location.pathname === link.href })),
                            { to: '/about', label: t('header.about_us'), match: location.pathname === '/about' },
                        ].map((item, index) => (
                            <li
                                key={index}
                                className={`transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'}`}
                                style={{ transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms' }}
                            >
                                <Link
                                    to={item.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold text-base transition-all duration-200 ${item.match
                                        ? 'text-[#FF822E] bg-orange-50'
                                        : 'text-[#0859BC] hover:bg-blue-50 hover:text-[#FF822E]'
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.match ? 'bg-[#FF822E]' : 'bg-[#0859BC]/30'}`}></span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div
                        className={`mt-6 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
                    >
                        <a href="#" className="bg-gradient-to-r from-[#0859BC] to-[#064a96] text-white py-3.5 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all block">
                            <i className="far fa-user ml-2"></i>
                            {t('header.student_platform')}
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;