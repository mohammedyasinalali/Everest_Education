
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { leadershipData, teamData, reasonsData } from '../constants/data';

const AboutUs = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={t('header.about_us')}
                description={t('about_us.mission_desc') || undefined}
            />
            {/* Hero Section with Background Image */}
            <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Dark Blue Overlay */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')`
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-navy/95"></div>
                </div>

                {/* Content */}
                <Container>
                    <div className="relative z-10 text-center text-white">
                        {/* Breadcrumb */}
                        <div className="mb-6 flex items-center justify-center gap-2 text-sm">
                            <span className="text-white/70">{t('header.home')}</span>
                            <span className="text-secondary">/</span>
                            <span className="text-secondary font-semibold">{t('header.about_us')}</span>
                        </div>

                        {/* Page Title */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                            {t('header.about_us')}
                        </h1>
                    </div>
                </Container>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* About Everest Education Section */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {/* Section Title */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 relative inline-block">
                                {t('about_us.about_everest_title')}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {t('about_us.about_everest_p1')}
                            </p>

                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {t('about_us.about_everest_p2')}
                            </p>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                {t('about_us.about_everest_p3')}
                            </p>

                            {/* Decorative Elements */}
                            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-center gap-8 text-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-navy rounded-full flex items-center justify-center">
                                        <i className="fas fa-calendar-alt text-white text-xl"></i>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{t('about_us.founded_in')}</p>
                                        <p className="text-2xl font-bold text-secondary">2019</p>
                                    </div>
                                </div>

                                <div className="w-px h-12 bg-gray-300"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary rounded-full flex items-center justify-center">
                                        <i className="fas fa-users text-white text-xl"></i>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{t('about_us.served_students')}</p>
                                        <p className="text-2xl font-bold text-primary">10,000+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-primary to-navy rounded-3xl p-8 text-white relative overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <i className="fas fa-bullseye text-3xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('about_us.mission_title')}</h3>
                                <p className="text-white/90 leading-relaxed font-light">
                                    {t('about_us.mission_desc')}
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-secondary to-secondary rounded-3xl p-8 text-white relative overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <i className="fas fa-eye text-3xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('about_us.vision_title')}</h3>
                                <p className="text-white/90 leading-relaxed font-light">
                                    {t('about_us.vision_desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Why Everest Section */}
                    <div className="mt-24">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                                {t('about_us.why_us.title')}
                            </h2>
                            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                                {t('about_us.why_us.subtitle')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {reasonsData.map((item, index) => (
                                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">
                                        {t(`about_us.why_us.features.${item.key}.title`)}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {t(`about_us.why_us.features.${item.key}.desc`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </Container>
            </section>


            {/* Our Team Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            {t('about_us.our_team')}
                        </h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            {t('about_us.our_team_desc')}
                        </p>
                    </div>

                    {/* Leadership Row */}
                    <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto mb-16">
                        {leadershipData.map((member, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                {/* Circular Image Container */}
                                <div className="relative mb-6">
                                    <div className="w-64 h-64 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                                        <div
                                            className="w-full h-full bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url('${member.image}')`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="bg-gradient-to-r from-primary to-navy rounded-2xl px-8 py-4 shadow-lg min-w-[280px]">
                                    <h3 className="text-2xl font-bold text-white text-center mb-1">
                                        {isArabic ? member.name : member.nameEn}
                                    </h3>
                                    <p className="text-white/90 text-center">
                                        {isArabic ? member.position : member.positionEn}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Team Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamData.map((member, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                {/* Circular Image Container */}
                                <div className="relative mb-4">
                                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                                        <div
                                            className="w-full h-full bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url('${member.image}')`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="bg-gradient-to-r from-primary to-navy rounded-2xl px-6 py-3 shadow-lg min-w-[220px]">
                                    <h3 className="text-lg font-bold text-white text-center mb-1">
                                        {isArabic ? member.name : member.nameEn}
                                    </h3>
                                    <p className="text-white/90 text-sm text-center">
                                        {isArabic ? member.position : member.positionEn}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Contact Form Section */}
            <ContactForm />




        </div >
    );
};

export default AboutUs;
