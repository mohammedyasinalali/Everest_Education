import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SearchFilter = () => {
    const { t } = useTranslation();

    // State for managing dropdowns
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState(t('search_filter.levels.bachelor'));
    const [selectedLanguage, setSelectedLanguage] = useState(`${t('search_filter.languages.turkish')} ( 254 )`);
    const [selectedSpecialty, setSelectedSpecialty] = useState(t('search_filter.default_specialty_placeholder'));

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initial default values update when language changes
    useEffect(() => {
        setSelectedLevel(t('search_filter.levels.bachelor'));
        setSelectedLanguage(`${t('search_filter.languages.turkish')} ( 254 )`);
        setSelectedSpecialty(t('search_filter.default_specialty_placeholder'));
    }, [t]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const levels = [
        t('search_filter.levels.diploma_2_years'),
        t('search_filter.levels.bachelor'),
        t('search_filter.levels.master_thesis'),
        t('search_filter.levels.phd'),
        t('search_filter.levels.master_no_thesis'),
        t('search_filter.levels.master_online')
    ];

    const languages = [
        { name: t('search_filter.languages.english'), count: 224 },
        { name: t('search_filter.languages.turkish'), count: 254 },
        { name: t('search_filter.languages.other'), count: 51 },
        { name: t('search_filter.languages.russian'), count: 3 },
        { name: t('search_filter.languages.french'), count: 1 },
        { name: t('search_filter.languages.english_turkish'), count: 38 },
        { name: t('search_filter.languages.arabic'), count: 5 },
        { name: t('search_filter.languages.german'), count: 3 },
    ];

    const specialties = [
        t('search_filter.specialties.business_admin'),
        t('search_filter.specialties.logistics'),
        t('search_filter.specialties.healthcare_man'),
        t('search_filter.specialties.tourism'),
        t('search_filter.specialties.tourism_hotels'),
        t('search_filter.specialties.health_man'),
        t('search_filter.specialties.crisis_man'),
        t('search_filter.specialties.medicine'),
        t('search_filter.specialties.dentistry'),
        t('search_filter.specialties.pharmacy'),
        t('search_filter.specialties.software_eng')
    ];

    return (
        <div className="w-full relative z-20 -mt-24 px-4 mb-20" ref={dropdownRef}>
            <div className="max-w-[1000px] mx-auto">
                {/* Header Title Bubble */}
                <div className="flex justify-center mb-[-1px] relative z-10">
                    <div className="bg-[#343a40] text-white px-8 py-3 rounded-t-2xl text-lg font-bold shadow-lg">
                        {t('search_filter.search_title')}
                    </div>
                </div>

                {/* Main Filter Bar */}
                <div className="bg-[#212529]/90 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-4">

                    {/* Level Dropdown */}
                    <div className="relative w-full md:flex-1">
                        <button
                            onClick={() => toggleDropdown('level')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl flex items-center justify-between transition-all group border border-transparent hover:border-white/30"
                        >
                            <span className="flex items-center gap-3 text-base">
                                <i className="fas fa-university text-gray-400 group-hover:text-white transition-colors"></i>
                                {selectedLevel}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${openDropdown === 'level' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === 'level' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn">
                                {levels.map((level, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                        onClick={() => {
                                            setSelectedLevel(level);
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        {level}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative w-full md:flex-1">
                        <button
                            onClick={() => toggleDropdown('language')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl flex items-center justify-between transition-all group border border-transparent hover:border-white/30"
                        >
                            <span className="flex items-center gap-3 text-base">
                                <i className="fas fa-globe text-gray-400 group-hover:text-white transition-colors"></i>
                                {selectedLanguage}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${openDropdown === 'language' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {openDropdown === 'language' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn">
                                {languages.map((lang, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                        onClick={() => {
                                            setSelectedLanguage(`${lang.name} ( ${lang.count} )`);
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        <span>{lang.name}</span>
                                        <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md text-xs">( {lang.count} )</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Specialty Dropdown */}
                    <div className="relative w-full md:flex-[1.5]">
                        <button
                            onClick={() => toggleDropdown('specialty')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl flex items-center justify-between transition-all group border border-transparent hover:border-white/30"
                        >
                            <span className="flex items-center gap-3 text-base">
                                <i className="fas fa-th-large text-gray-400 group-hover:text-white transition-colors"></i>
                                {selectedSpecialty}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${openDropdown === 'specialty' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {openDropdown === 'specialty' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn max-h-[300px] overflow-y-auto custom-scrollbar">
                                {specialties.map((spec, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                        onClick={() => {
                                            setSelectedSpecialty(spec);
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        {spec}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-white hover:bg-gray-100 text-[#212529] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-w-[120px]">
                            <i className="fas fa-search"></i>
                            {t('search_filter.search')}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
