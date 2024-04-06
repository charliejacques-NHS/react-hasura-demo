import { useContext } from 'react';
import {
  type SiteSettingsContextValue,
  SiteSettingsContext,
  SiteSettingsProvider,
} from './SiteSettingsContext';
import {
  type AuthContextValue,
  AuthContext,
  AuthProvider,
} from './AuthContext';

export const useSiteSettingsContext = () => useContext(SiteSettingsContext);
export const useAuthContext = () => useContext(AuthContext);

export type { SiteSettingsContextValue, AuthContextValue };
export { SiteSettingsContext, SiteSettingsProvider, AuthContext, AuthProvider };
