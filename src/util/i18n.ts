import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@app/assets/translations/en.json'; // Path to your English translations
import frTranslation from '@app/assets/translations/fr.json'; // Path to your French translations

enum LANGUAGES {
  EN = 'en',
  FR = 'fr',
}

// Define translations
const resources = {
  [LANGUAGES.EN]: {
    translation: enTranslation,
  },
  [LANGUAGES.FR]: {
    translation: frTranslation,
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
