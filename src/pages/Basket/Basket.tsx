import { useBasketContext } from '@app/context';
import s from './Basket.module.scss';
import { DB, ROUTES } from '@app/types';
import { useSiteTitle } from '@app/hooks';
import { Button, Product } from '@app/components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Component to render the basket page
 * @returns {JSX.Element}
 */
const Basket = (): JSX.Element => {
  const { basket, totalPrice, completeBasket } = useBasketContext();
  const navigate = useNavigate();
  useSiteTitle('Basket');
  const { t } = useTranslation();

  const distinctProducts = Object.values(
    basket?.basket_products.reduce<{
      [key: string]: {
        id: string;
        product: Omit<DB.Product, 'created_at' | 'updated_at'>;
        quantity: number;
      };
    }>((acc, item) => {
      if (acc[item.product.id]) {
        acc[item.product.id].quantity++;
      } else {
        acc[item.product.id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {}) || {},
  );

  const checkoutBasket = () =>
    completeBasket()
      .then(() => alert('Basket successfully checked out!'))
      .then(() => navigate(ROUTES.HOME));

  return (
    <div className={s.wrapper}>
      {distinctProducts.map(({ product }) => (
        <Product {...product} withTotalPrice />
      ))}
      <div className={s.checkoutWrapper}>
        <p>{t('basketTotal', { x: totalPrice.toFixed(2) })}</p>
        <Button onClick={checkoutBasket}>{t('checkoutBasket')}</Button>
      </div>
    </div>
  );
};

export default Basket;
