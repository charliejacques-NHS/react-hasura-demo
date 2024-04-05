import { useTranslation } from 'react-i18next';
import s from './Header.module.scss';

/**
 * Component which defines the header of the page
 * @returns {JSX.Element}
 */
const Header = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <header className={s.wrapper}>
      <p>{t('header')}</p>
    </header>
  );
};

export default Header;
