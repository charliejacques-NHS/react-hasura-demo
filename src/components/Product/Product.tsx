import { useProducts } from '@app/hooks';
import s from './Product.module.scss';
import { ProductQuantityPicker, Button, Pill } from '@app/components';
import { useBasketContext } from '@app/context';

type ProductInformation = ReturnType<typeof useProducts>['products'][number];

/**
 * Props Type interface for {@link Product}
 */
export interface ProductProps extends Omit<ProductInformation, 'categories'> {
  withTotalPrice?: boolean;
  categories?: ProductInformation['categories'];
}

/**
 * Component for rendering a styled Product
 * @param {ProductProps} props
 * @returns {JSX.Element}
 */
const Product = ({
  id,
  image_src,
  name,
  description,
  price,
  categories = [],
  withTotalPrice,
}: ProductProps): JSX.Element => {
  const { itemInBasket, addItemToBasket, numberOfGivenItemInBasket } =
    useBasketContext();

  return (
    <div className={s.wrapper} key={id}>
      <div className={s.info}>
        <div className={s.row}>
          <img className={s.image} src={image_src} alt={name} />
          <h3 className={s.name}>{name}</h3>
        </div>
        <p className={s.description}>{description}</p>
        <p className={s.price}>
          {withTotalPrice
            ? `Product Total: £${(price * numberOfGivenItemInBasket(id)).toFixed(2)}`
            : `£${price.toFixed(2)}`}
        </p>
        {!itemInBasket(id) ? (
          <Button onClick={() => addItemToBasket(id)}>Add to basket</Button>
        ) : (
          <ProductQuantityPicker id={id} />
        )}
      </div>
      {categories.length ? (
        <div className={s.categoriesWrapper}>
          <span>Categories: </span>
          {categories.map(({ category }) => (
            <Pill text={category.friendly_name} key={`${id}-${category.id}`} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Product;
