import { useTranslation } from 'react-i18next';
import s from './Header.module.scss';
import { ROUTES } from '@app/types';
import { Link } from 'react-router-dom';
import { useAuthContext, useBasketContext } from '@app/context';

/**
 * Component which defines the header of the page
 * @returns {JSX.Element}
 */
const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { totalPrice } = useBasketContext();
  const { authenticated } = useAuthContext();

  if (!authenticated) return <></>;

  return (
    <header className={s.wrapper}>
      <Link to={ROUTES.HOME}>{t('home')}</Link>

      <Link to={ROUTES.BASKET}>
        {t('Basket')} (£{totalPrice.toFixed(2)})
      </Link>
    </header>
  );
};

export default Header;
