import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@app/assets/translations/en.json'; // Path to your English translations

enum LANGUAGES {
  EN = 'en',
}

// Define translations
const resources = {
  [LANGUAGES.EN]: {
    translation: enTranslation,
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: LANGUAGES.EN, // Default language
  fallbackLng: LANGUAGES.EN, // Fallback language
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
