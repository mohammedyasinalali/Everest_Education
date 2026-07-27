import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../services/publicApi';

const SearchFilter = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [allSpecialties, setAllSpecialties] = useState<any[]>([]);
    
    // States for selected values
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(null);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch specialties from DB
    useEffect(() => {
        const fetchSpecialties = async () => {
            const data = await publicApi.getSpecialties(i18n.language);
            setAllSpecialties(data);
        };
        fetchSpecialties();
    }, [i18n.language]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    // 1. Compute Levels from DB Data
    // Admin category values are usually: bachelor, master, phd, diploma
    const availableLevels = Array.from(new Set(allSpecialties.map(s => s.category).filter(Boolean)));
    
    // Map category to localized string (fallback to raw category if not translated)
    const getLevelName = (cat: string) => {
        const keys: Record<string, string> = {
            bachelor: t('search_filter.levels.bachelor', 'بكالوريوس'),
            master: t('search_filter.levels.master_thesis', 'ماجستير'),
            phd: t('search_filter.levels.phd', 'دكتوراه'),
            diploma: t('search_filter.levels.diploma_2_years', 'دبلوم')
        };
        return keys[cat] || cat;
    };

    // 2. Filter data by level to compute languages
    const filteredByLevel = allSpecialties.filter(s => s.category === selectedLevel);
    
    const languageCounts: Record<string, number> = {};
    
    // First, gather all unique languages
    const uniqueLangs = Array.from(new Set(filteredByLevel.map(s => s.language || 'غير محدد')));
    
    // Then, for each unique language, count how many specialties would be shown if selected
    uniqueLangs.forEach(langOption => {
        const count = filteredByLevel.filter(s => {
            const sLang = s.language || 'غير محدد';
            if (sLang === langOption) return true;
            if (langOption === 'التركية' && sLang === 'التركية والإنجليزية') return true;
            if (langOption === 'الإنجليزية' && sLang === 'التركية والإنجليزية') return true;
            return false;
        }).length;
        languageCounts[langOption] = count;
    });

    const availableLanguages = Object.entries(languageCounts).map(([name, count]) => ({ name, count }));

    // 3. Filter data by language to compute specialties
    const filteredByLevelAndLanguage = filteredByLevel.filter(s => {
        if (!selectedLanguage) return false;
        const sLang = s.language || 'غير محدد';
        
        // Exact match is always true
        if (sLang === selectedLanguage) return true;

        // If user selected Turkish, also include Bilingual (Turkish & English)
        if (selectedLanguage === 'التركية' && sLang === 'التركية والإنجليزية') return true;
        
        // If user selected English, also include Bilingual (Turkish & English)
        if (selectedLanguage === 'الإنجليزية' && sLang === 'التركية والإنجليزية') return true;

        return false;
    });

    const handleSearch = () => {
        if (selectedSpecialty) {
            navigate(`/specialties/${selectedSpecialty.id}`);
        } else {
            navigate(`/specialties`);
        }
    };

    return (
        <div className="w-full relative z-20 -mt-24 px-4 mb-20" ref={dropdownRef}>
            <div className="max-w-[1000px] mx-auto">
                <div className="flex justify-center mb-[-1px] relative z-10">
                    <div className="bg-[#343a40] text-white px-8 py-3 rounded-t-2xl text-lg font-bold shadow-lg">
                        {t('search_filter.search_title', 'ابحث عن التخصص الذي ترغب فيه')}
                    </div>
                </div>

                <div className="bg-[#212529]/90 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-4">

                    {/* Level Dropdown */}
                    <div className="relative w-full md:flex-1">
                        <button
                            onClick={() => toggleDropdown('level')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl flex items-center justify-between transition-all group border border-transparent hover:border-white/30"
                        >
                            <span className="flex items-center gap-3 text-base">
                                <i className="fas fa-university text-gray-400 group-hover:text-white transition-colors"></i>
                                {selectedLevel ? getLevelName(selectedLevel) : t('search_filter.placeholders.level', 'اختر المرحلة الدراسية')}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${openDropdown === 'level' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {openDropdown === 'level' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn">
                                {availableLevels.length > 0 ? availableLevels.map((level, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                        onClick={() => {
                                            setSelectedLevel(level);
                                            setSelectedLanguage(null);
                                            setSelectedSpecialty(null);
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        {getLevelName(level)}
                                    </div>
                                )) : (
                                    <div className="px-4 py-3 text-gray-500 text-center">جاري التحميل...</div>
                                )}
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
                                {selectedLanguage ? selectedLanguage : t('search_filter.placeholders.language', 'اختر لغة الدراسة التي تريدها')}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${openDropdown === 'language' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {openDropdown === 'language' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn">
                                {!selectedLevel ? (
                                    <div className="px-4 py-3 text-gray-500 text-center">{t('search_filter.alerts.select_level', 'لا يوجد بيانات، قم باختيار المرحلة الدراسية أولاً')}</div>
                                ) : availableLanguages.length > 0 ? (
                                    availableLanguages.map((lang, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                            onClick={() => {
                                                setSelectedLanguage(lang.name);
                                                setSelectedSpecialty(null);
                                                setOpenDropdown(null);
                                            }}
                                        >
                                            <span>{lang.name}</span>
                                            <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md text-xs">( {lang.count} )</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-gray-500 text-center">لا توجد لغات متاحة لهذه المرحلة</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Specialty Dropdown */}
                    <div className="relative w-full md:flex-[1.5]">
                        <button
                            onClick={() => toggleDropdown('specialty')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl flex items-center justify-between transition-all group border border-transparent hover:border-white/30"
                        >
                            <span className="flex items-center gap-3 text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-[250px]">
                                <i className="fas fa-th-large text-gray-400 group-hover:text-white transition-colors flex-shrink-0"></i>
                                {selectedSpecialty ? selectedSpecialty.name : t('search_filter.placeholders.specialty', 'اختر التخصص الذي ترغب فيه')}
                            </span>
                            <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform flex-shrink-0 ${openDropdown === 'specialty' ? 'rotate-180' : ''}`}></i>
                        </button>

                        {openDropdown === 'specialty' && (
                            <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50 py-1 text-gray-800 text-sm animate-fadeIn max-h-[300px] overflow-y-auto custom-scrollbar">
                                {!selectedLanguage ? (
                                    <div className="px-4 py-3 text-gray-500 text-center">{t('search_filter.alerts.select_language', 'لا يوجد بيانات، قم باختيار لغة الدراسة أولاً')}</div>
                                ) : filteredByLevelAndLanguage.length > 0 ? (
                                    filteredByLevelAndLanguage.map((spec, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center bg-white hover:text-[#0859BC] transition-colors border-b border-gray-50 last:border-0"
                                            onClick={() => {
                                                setSelectedSpecialty(spec);
                                                setOpenDropdown(null);
                                            }}
                                        >
                                            {spec.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-gray-500 text-center">لا توجد تخصصات متاحة لهذه اللغة</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="w-full md:w-auto">
                        <button 
                            onClick={handleSearch}
                            className="w-full md:w-auto bg-white hover:bg-gray-100 text-[#212529] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-w-[120px]"
                        >
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
