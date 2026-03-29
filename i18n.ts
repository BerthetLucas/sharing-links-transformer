import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import en from './messages/en.json';

export default getRequestConfig(async () => {
  const locale = routing.defaultLocale;

  const messages = {
    en,
  };

  return {
    locale,
    timeZone: 'UTC',
    messages: messages[locale as keyof typeof messages],
  };
});
