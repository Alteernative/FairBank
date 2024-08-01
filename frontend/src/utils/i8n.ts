import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from "@/locales/fr/translation.json";
import translationEN from "@/locales/en/translation.json";
import translationES from "@/locales/es/translation.json";

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
    es: {
      translation: translationES,
    },
  },
});

export default i18n;
