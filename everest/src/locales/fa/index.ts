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
        title: "تماس با ما",
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
    blog_title: "وبلاگ",
    blog_description: "اخبار و مقالات مفید درباره تحصیل و زندگی در ترکیه.",
    mega_menu: {
        bachelor_title: "رشته‌های کارشناسی",
        bachelor: {
            accounting: "حسابداری و مدیریت مالی",
            ai_engineering: "مهندسی هوش مصنوعی",
            architecture: "معماری",
            new_media: "رسانه‌های نوین",
            psychology: "روانشناسی",
            architectural_eng: "مهندسی معماری"
        },
        master_title: "رشته‌های کارشناسی ارشد",
        master: {
            industrial_eng: "ارشد مهندسی صنایع",
            english_literature: "ارشد زبان و ادبیات انگلیسی",
            biomedical_eng: "ارشد مهندسی پزشکی",
            it: "ارشد فناوری اطلاعات",
            renewable_energy: "ارشد انرژی‌های تجدیدپذیر",
            ai_systems: "ارشد سیستم‌های هوش مصنوعی"
        },
        phd_title: "رشته‌های دکتری",
        phd: {
            dentistry: "دکتری دندانپزشکی",
            business_admin: "دکتری مدیریت بازرگانی",
            aerospace_eng: "دکتری مهندسی هوافضا",
            political_science: "دکتری علوم سیاسی",
            navigation_eng: "دکتری مهندسی ناوبری"
        },
        diploma_title: "دوره‌های دیپلم (۲ ساله)",
        diploma: {
            anesthesia: "بیهوشی",
            pharmacy_services: "خدمات داروسازی",
            culinary_arts: "هنرهای آشپزی",
            optics: "اپتیک",
            clinical_labs: "آزمایشگاه‌های بالینی",
            computer_programming: "برنامه‌نویسی کامپیوتر"
        },
        view_all_specialties: "مشاهده همه رشته‌ها"
    }
};
