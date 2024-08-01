import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAR from "@/locales/ar/translation.json";
import translationDE from "@/locales/de/translation.json";
import translationEN from "@/locales/en/translation.json";
import translationES from "@/locales/es/translation.json";
import translationFR from "@/locales/fr/translation.json";
import translationIT from "@/locales/it/translation.json";
import translationJA from "@/locales/ja/translation.json";
import translationPT from "@/locales/pt/translation.json";
import translationRU from "@/locales/ru/translation.json";
import translationZH from "@/locales/zh/translation.json";

i18n.use(initReactI18next).init({
  lng: "fr",
  fallbackLng: "fr",
  resources: {
    ar: {
      translation: translationAR,
    },
    de: {
      translation: translationDE,
    },
    en: {
      translation: translationEN,
    },
    es: {
      translation: translationES,
    },
    fr: {
      translation: translationFR,
    },
    it: {
      translation: translationIT,
    },
    ja: {
      translation: translationJA,
    },
    pt: {
      translation: translationPT,
    },
    ru: {
      translation: translationRU,
    },
    zh: {
      translation: translationZH,
    },
  },
});

export default i18n;
