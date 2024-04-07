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
import {
  type BasketContextValue,
  BasketContext,
  BasketProvider,
} from './BasketContext';

export const useSiteSettingsContext = () => useContext(SiteSettingsContext);
export const useAuthContext = () => useContext(AuthContext);
export const useFeatureFlagsContext = () => useContext(FeatureFlagsContext);
export const useBasketContext = () => useContext(BasketContext);

export type {
  SiteSettingsContextValue,
  AuthContextValue,
  FeatureFlagsContextValue,
  BasketContextValue,
};

export {
  SiteSettingsContext,
  SiteSettingsProvider,
  AuthContext,
  AuthProvider,
  FeatureFlagsContext,
  FeatureFlagsProvider,
  BasketContext,
  BasketProvider,
};
