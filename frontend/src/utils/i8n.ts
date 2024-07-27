import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from "@/locales/fr/translation.json";
import translationEN from "@/locales/en/translation.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "fr",
  resources: {
    fr: {
      translation: translationFR,
    },
    en: {
      translation: translationEN,
    },
  },
});

export default i18n;
