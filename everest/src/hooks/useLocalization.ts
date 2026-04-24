import { useTranslation } from 'react-i18next';

/**
 * A custom hook to handle robust extraction of localized strings/arrays from data objects
 * based on the current active language in i18next.
 */
export const useLocalization = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'ar'; // Default to arabic if undefined

    /**
     * Extracts a localized string from a translations object.
     * Falls back to English, then Arabic, then empty string.
     */
    const getLocalizedText = (field?: Record<string, string>) => {
        if (!field) return '';
        return field[currentLang] || field['en'] || field['ar'] || '';
    };

    /**
     * Extracts a localized array from a translations object.
     * Falls back to English, then Arabic, then empty array.
     */
    const getLocalizedList = (field?: Record<string, string[]>) => {
        if (!field) return [];
        return field[currentLang] || field['en'] || field['ar'] || [];
    };

    return {
        currentLang,
        getLocalizedText,
        getLocalizedList
    };
};
