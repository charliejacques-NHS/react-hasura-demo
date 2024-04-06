import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@app/components';
import './index.scss';
import { AuthProvider } from '@app/context';
import { ContextWrappers } from './util/setupContextWrappers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ContextWrappers>
        <App />
      </ContextWrappers>
    </AuthProvider>
  </React.StrictMode>,
);
