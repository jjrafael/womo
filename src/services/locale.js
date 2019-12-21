import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nXHR from 'i18next-xhr-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';

const locale = () => {
  return new Promise((resolve) => {
    i18n
      .use(initReactI18next)
      .use(i18nXHR)
      .use(intervalPlural)
      .init({
        // debug: true,
        lng: 'en',
        fallbackLng: 'en',
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        interpolation: {
          escapeValue: false
        }
      });

    i18n.on('initialized', resolve);
  });
};

export default locale;