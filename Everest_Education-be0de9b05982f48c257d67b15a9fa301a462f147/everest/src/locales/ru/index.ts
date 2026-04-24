// Import all modular files
import commonTranslations from './common.json';
import headerTranslations from './header.json';
import footerTranslations from './footer.json';
import homeTranslations from './home.json';
import aboutTranslations from './about.json';
import servicesTranslations from './services.json';
import searchTranslations from './search.json';

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
        title: "Контакты",
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
    blog_title: "Блог",
    blog_description: "Новости и полезные статьи о поступлении и жизни в Турции.",
    mega_menu: {
        bachelor_title: "Бакалавриат",
        bachelor: {
            accounting: "Бухгалтерский учёт и финансовый менеджмент",
            ai_engineering: "Инженерия искусственного интеллекта",
            architecture: "Архитектура",
            new_media: "Новые медиа",
            psychology: "Психология",
            architectural_eng: "Архитектурная инженерия"
        },
        master_title: "Магистратура",
        master: {
            industrial_eng: "Магистр промышленной инженерии",
            english_literature: "Магистр английской литературы",
            biomedical_eng: "Магистр биомедицинской инженерии",
            it: "Магистр информационных технологий",
            renewable_energy: "Магистр возобновляемой энергетики",
            ai_systems: "Магистр систем ИИ"
        },
        phd_title: "Докторантура",
        phd: {
            dentistry: "Докторантура по стоматологии",
            business_admin: "Докторантура по управлению бизнесом",
            aerospace_eng: "Докторантура по авиационной инженерии",
            political_science: "Докторантура по политологии",
            navigation_eng: "Докторантура по навигационной инженерии"
        },
        diploma_title: "Дипломные программы (2 года)",
        diploma: {
            anesthesia: "Анестезиология",
            pharmacy_services: "Фармацевтические услуги",
            culinary_arts: "Кулинарное искусство",
            optics: "Оптика",
            clinical_labs: "Клинические лаборатории",
            computer_programming: "Программирование"
        },
        view_all_specialties: "Все специальности"
    }
};
