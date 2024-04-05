import { useContext } from 'react';
import {
  type SiteSettingsContextValue,
  SiteSettingsContext,
  SiteSettingsProvider,
} from './SiteSettingsContext';

export const useSiteSettingsContext = () => useContext(SiteSettingsContext);

export type { SiteSettingsContextValue };
export { SiteSettingsContext, SiteSettingsProvider };
