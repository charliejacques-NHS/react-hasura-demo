import { useTranslation } from 'react-i18next';
import s from './Footer.module.scss';

/**
 * Component which defines the footer of the page
 * @returns {JSX.Element}
 */
const Footer = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <footer className={s.wrapper}>
      <p>{t('footer')}</p>
    </footer>
  );
};

export default Footer;
