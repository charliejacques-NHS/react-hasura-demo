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
import {
  type FeatureFlagsContextValue,
  FeatureFlagsContext,
  FeatureFlagsProvider,
} from './FeatureFlagsContext';

export const useSiteSettingsContext = () => useContext(SiteSettingsContext);
export const useAuthContext = () => useContext(AuthContext);
export const useFeatureFlagsContext = () => useContext(FeatureFlagsContext);

export type {
  SiteSettingsContextValue,
  AuthContextValue,
  FeatureFlagsContextValue,
};
export {
  SiteSettingsContext,
  SiteSettingsProvider,
  AuthContext,
  AuthProvider,
  FeatureFlagsContext,
  FeatureFlagsProvider,
};
