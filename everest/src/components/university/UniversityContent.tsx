import { useLocalization } from '../../hooks/useLocalization';
import type { University, Faculty } from '../../constants/universities';

interface UniversityContentProps {
    uni: University;
}

export const UniversityContent = ({ uni }: UniversityContentProps) => {
    const { currentLang, getLocalizedText, getLocalizedList } = useLocalization();

    return (
        <>
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
                    href={`https://wa.me/905451365495?text=${encodeURIComponent(currentLang === 'ar' ? `أريد معرفة تفاصيل الرسوم الدراسية في ${getLocalizedText(uni.name)}` : `I want to know tuition details for ${getLocalizedText(uni.name)}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 w-full bg-[#FF822E] hover:bg-[#e0701f] text-white py-4 rounded-xl font-bold font-['Tajawal'] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    <i className="fab fa-whatsapp text-xl"></i>
                    {currentLang === 'ar' ? 'استفسر عن الرسوم والمنح' : 'Inquire About Fees & Scholarships'}
                </a>
            </section>
        </>
    );
};
