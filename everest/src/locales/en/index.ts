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
    blog_title: "Our Blog",
    blog_description: "We look for news of organizations and useful topics for you in your educational journey, as it is coordinated, always full of everything that is useful and beneficial to you in our fields.",
    mega_menu: {
        bachelor_title: "Bachelor's Specialties",
        bachelor: {
            accounting: "Accounting & Financial Management",
            ai_engineering: "AI Engineering",
            architecture: "Architecture",
            new_media: "New Media",
            psychology: "Psychology",
            architectural_eng: "Architectural Engineering"
        },
        master_title: "Master's Specialties",
        master: {
            industrial_eng: "Master in Industrial Engineering",
            english_literature: "Master in English Literature",
            biomedical_eng: "Master in Biomedical Engineering",
            it: "Master in Information Technology",
            renewable_energy: "Master in Renewable Energy Systems",
            ai_systems: "Master in AI Systems"
        },
        phd_title: "PhD Specialties",
        phd: {
            dentistry: "PhD in Dentistry",
            business_admin: "PhD in Business Administration",
            aerospace_eng: "PhD in Aerospace Engineering",
            political_science: "PhD in Political Science",
            navigation_eng: "PhD in Navigation Engineering"
        },
        diploma_title: "Diploma Programs (2 Years)",
        diploma: {
            anesthesia: "Anesthesia",
            pharmacy_services: "Pharmacy Services",
            culinary_arts: "Culinary Arts",
            optics: "Optics",
            clinical_labs: "Clinical Laboratories",
            computer_programming: "Computer Programming"
        },
        view_all_specialties: "View All Specialties"
    }
};
