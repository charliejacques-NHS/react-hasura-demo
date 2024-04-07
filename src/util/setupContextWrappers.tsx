import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as GQLProvider } from 'urql';
import { useUrqlClient } from '@app/hooks';
import {
  BasketProvider,
  FeatureFlagsProvider,
  SiteSettingsProvider,
} from '@app/context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { HelmetProvider } from 'react-helmet-async';

export const ContextWrappers = ({ children }: PropsWithChildren) => {
  const client = useUrqlClient();

  return (
    <HelmetProvider context={{}}>
      <I18nextProvider i18n={i18n}>
        <GQLProvider value={client}>
          <BasketProvider>
            <FeatureFlagsProvider>
              <SiteSettingsProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </SiteSettingsProvider>
            </FeatureFlagsProvider>
          </BasketProvider>
        </GQLProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
};
