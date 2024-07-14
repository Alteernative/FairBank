import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';	

i18n
    .init({
    lng: 'fr', // if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: 'fr',
    resources: {
      en: {
        translation: {
          "key": "hello world"
        }
      }
    }
  });
  
export default i18n;  