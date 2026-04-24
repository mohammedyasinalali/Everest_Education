
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from './locales/ar/index';
import en from './locales/en/index';
import fa from './locales/fa/index';
import ru from './locales/ru/index';

// Initialize i18next
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            en: { translation: en },
            fa: { translation: fa },
            ru: { translation: ru },
        },
        fallbackLng: 'en', // Default fallback
        lng: 'ar', // Start with Arabic explicitly as requested
        debug: true,

        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false
        },

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

// Handle RTL/LTR direction based on language
i18n.on('languageChanged', (lng) => {
    const dir = (lng === 'ar' || lng === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
});

export default i18n;
