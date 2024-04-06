import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as GQLProvider } from 'urql';
import { useUrqlClient } from '@app/hooks';
import { SiteSettingsProvider } from '@app/context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export const ContextWrappers = ({ children }: PropsWithChildren) => {
  const client = useUrqlClient();

  return (
    <I18nextProvider i18n={i18n}>
      <GQLProvider value={client}>
        <SiteSettingsProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </SiteSettingsProvider>
      </GQLProvider>
    </I18nextProvider>
  );
};
