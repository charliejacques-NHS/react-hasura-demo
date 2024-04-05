import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import s from './Layout.module.scss';
import { Header, Footer } from '@app/components';
import { useTranslation } from 'react-i18next';

/**
 * Props Type Interface for {@link Layout}
 */
export interface LayoutProps {
  /**
   * The i18n translation key of the HTML Page Title
   */
  pageTitle?: string;
}

/**
 * Component which defines the layout of each page
 * @param {LayoutProps} props
 * @returns {JSX.Element}
 */
const Layout = ({ pageTitle }: LayoutProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={s.wrapper}>
      <Helmet>{pageTitle && <title>{t(pageTitle)}</title>}</Helmet>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
