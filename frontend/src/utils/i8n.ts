import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from "@/locales/fr/translation.json";
import translationEN from "@/locales/en/translation.json";
import translationES from "@/locales/es/translation.json";
import translationAR from "@/locales/ar/translation.json";
import translationDE from "@/locales/de/translation.json";

i18n.use(initReactI18next).init({
  lng: "fr",
  fallbackLng: "fr",
  resources: {
    fr: {
      translation: translationFR,
    },
    en: {
      translation: translationEN,
    },
    ar: {
      translation: translationAR,
    },
    es: {
      translation: translationES,
    },
    de: {
      translation: translationDE,
    },
  },
});

export default i18n;
