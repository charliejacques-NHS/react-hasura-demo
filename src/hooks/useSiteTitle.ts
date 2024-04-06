import { useEffect } from 'react';
import { useSiteSettingsContext } from '@app/context';
import { BASE_SITE_TITLE } from '@app/util/config';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to set the title of the site
 * @param title The i18n translation key for the title you want to set
 * @param overrideBase If true it will set the site title to be the exact string provided
 */
export const useSiteTitle = (title: string, overrideBase = false): void => {
  const { setSiteTitle } = useSiteSettingsContext();
  const { t } = useTranslation();

  useEffect(() => {
    setSiteTitle(overrideBase ? title : `${BASE_SITE_TITLE} - ${t(title)}`);

    return () => {
      setSiteTitle(BASE_SITE_TITLE);
    };
  }, [title]);
};
