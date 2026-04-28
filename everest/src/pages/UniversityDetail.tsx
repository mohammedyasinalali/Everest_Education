import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { useLocalization } from '../hooks/useLocalization';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { University } from '../constants/universities';
import { publicApi } from '../services/publicApi';
import {
    UniversityHero,
    UniversitySidebar,
    UniversityContent,
    RelatedUniversities
} from '../components/university';

const SECTION_IDS = ['about', 'video', 'vision', 'mission', 'advantages', 'faculties', 'admission', 'tuition', 'related'];

const UniversityDetail = () => {
    const { id } = useParams();
    const { currentLang } = useLocalization();
    const { activeSection, scrollToSection } = useScrollSpy(SECTION_IDS, 'about');

    const [uni, setUni] = useState<University | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const data = await publicApi.getUniversityById(id || '', currentLang);
            setUni(data || null);
            setLoading(false);
        };
        fetchData();
    }, [id, currentLang]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#0859BC] border-t-transparent rounded-full"></div>
            </div>
        );
    }

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

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={uni.name[currentLang as keyof typeof uni.name] || uni.name['en'] || ''}
                description={uni.description?.[currentLang as keyof typeof uni.description] || ''}
            />

            {/* Extracted Hero Section */}
            <UniversityHero uni={uni} />

            {/* Main Content */}
            <section className="py-12 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Extracted Sidebar Navigation */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <UniversitySidebar
                                uni={uni}
                                activeSection={activeSection}
                                scrollToSection={scrollToSection}
                            />
                        </div>

                        {/* Extracted Main Content Area */}
                        <div className="lg:col-span-3 order-2 lg:order-1 space-y-10">
                            <UniversityContent uni={uni} />
                            <RelatedUniversities uni={uni} />
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
