import { useBasketContext } from '@app/context';
import s from './Basket.module.scss';
import { DB } from '@app/types';
import { useSiteTitle } from '@app/hooks';
import { ProductQuantityPicker } from '@app/components';

/**
 * Component to render the basket page
 * @returns {JSX.Element}
 */
const Basket = (): JSX.Element => {
  const { basket, totalPrice } = useBasketContext();

  useSiteTitle('Basket');

  const distinctProducts = Object.values(
    basket?.basket_products.reduce<{
      [key: string]: {
        id: string;
        product: Omit<DB.Product, 'created_at' | 'updated_at' | 'description'>;
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

  return (
    <div className={s.wrapper}>
      {distinctProducts.map(({ id, product, quantity }) => (
        <div key={id}>
          <h3>{product.name}</h3>
          <p>Product Total: £{(product.price * quantity).toFixed(2)}</p>
          <ProductQuantityPicker id={product.id} />
        </div>
      ))}
      <div>
        <p>Basket Total: £{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Basket;
