import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import s from './Layout.module.scss';
import { Header } from '@app/components';

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
  return (
    <div className={s.wrapper}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
