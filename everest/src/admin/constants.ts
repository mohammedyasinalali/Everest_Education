// Admin API base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Supported locales for translations
export const LOCALES = [
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];
