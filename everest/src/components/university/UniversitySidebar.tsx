import { useLocalization } from '../../hooks/useLocalization';
import type { University } from '../../constants/universities';

interface UniversitySidebarProps {
    uni: University;
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

export const UniversitySidebar = ({ uni, activeSection, scrollToSection }: UniversitySidebarProps) => {
    const { currentLang, getLocalizedText } = useLocalization();

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

    return (
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
                    href={`https://wa.me/905451365495?text=${encodeURIComponent(currentLang === 'ar' ? `أرغب بالاستفسار عن جامعة ${getLocalizedText(uni.name)}` : `I want to inquire about ${getLocalizedText(uni.name)}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#FF822E] hover:bg-[#e0701f] text-white py-3 rounded-xl font-bold font-['Tajawal'] transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <i className="fab fa-whatsapp text-lg"></i>
                    {currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </a>
            </div>
        </div>
    );
};
