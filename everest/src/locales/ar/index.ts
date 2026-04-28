// Import all modular files
import commonTranslations from './common.json';
import headerTranslations from './header.json';
import footerTranslations from './footer.json';
import homeTranslations from './home.json';
import aboutTranslations from './about.json';
import servicesTranslations from './services.json';
import searchTranslations from './search.json';
import adminTranslations from './admin.json';

// Export in the EXACT same structure as the old translation.json
export default {
    header: headerTranslations,
    hero: homeTranslations.hero,
    search_filter: searchTranslations,
    common: commonTranslations,
    about: homeTranslations.about_section,
    services_section: servicesTranslations,
    faq: homeTranslations.faq,
    contact: {
        address_title: footerTranslations.address_title,
        phone_title: footerTranslations.phone_title,
        email_title: footerTranslations.email_title,
        address_lines: footerTranslations.address_lines
    },
    footer: footerTranslations,
    partners: homeTranslations.partners,
    features_section: homeTranslations.features,
    consultation: homeTranslations.consultation,
    contact_form: homeTranslations.contact_form,
    about_us: aboutTranslations,
    blog_title: "مدونتنا",
    blog_description: "نبحث عن أخبار المنظمات والمواضيع المفيدة لك في رحلتك التعليمية، فهي بوابل منسق، مليئة دائماً بكل ما هو مفيد ونافع لك في مجالاتنا.",
    mega_menu: {
        bachelor_title: "تخصصات البكالوريوس",
        bachelor: {
            accounting: "المحاسبة وإدارة المالية",
            ai_engineering: "تخصص هندسة الذكاء الاصطناعي",
            architecture: "الهندسة المعمارية",
            new_media: "الإعلام الجديد",
            psychology: "تخصص علم النفس",
            architectural_eng: "تخصص الهندسة المعمارية"
        },
        master_title: "تخصصات الماجستير",
        master: {
            industrial_eng: "ماجستير الهندسة الصناعية",
            english_literature: "ماجستير اللغة الإنجليزية وآدابها",
            biomedical_eng: "ماجستير الهندسة المدنية الحيوية",
            it: "ماجستير تكنولوجيا المعلومات",
            renewable_energy: "ماجستير الأنظمة المتجددة والطاقة",
            ai_systems: "ماجستير النظم الاصطناعي"
        },
        phd_title: "تخصصات الدكتوراه",
        phd: {
            dentistry: "دكتوراه طب الأسنان في الجامعات التركية",
            business_admin: "دكتوراه إدارة الأعمال في تركيا",
            aerospace_eng: "دكتوراه في هندسة الطيران في تركيا",
            political_science: "دكتوراه العلوم السياسية",
            navigation_eng: "رسالة دكتوراه هندسة الموجهات في تركيا"
        },
        diploma_title: "تخصصات المعاهد دبلوم سنتين",
        diploma: {
            anesthesia: "تخصص التخدير",
            pharmacy_services: "معهد الخدمات الصيدلية",
            culinary_arts: "دبلوم فنون الطبخ والمطبخ في تركيا",
            optics: "دبلوم البصريات",
            clinical_labs: "المختبرات السريرية",
            computer_programming: "معهد برمجة الحاسوب"
        },
        view_all_specialties: "عرض كافة التخصصات"
    },
    admin: adminTranslations
};
