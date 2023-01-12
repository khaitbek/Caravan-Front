import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { lang } from "./lang";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: lang.en
            },
            uz: {
                translation: lang.uz
            },
            kr:{
                translation:lang.kr
            },
            ru: {
                translation: lang.ru
            },
        }
    });


export default i18n;