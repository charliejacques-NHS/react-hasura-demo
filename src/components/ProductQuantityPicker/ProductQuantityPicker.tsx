import { useBasketContext } from '@app/context';
import { Button } from '..';
import s from './ProductQuantityPicker.module.scss';

/**
 * Props Type Interface for {@link ProductQuantityPicker}
 */
export interface ProductQuantityPickerProps {
  /**
   * The ID of the product
   */
  id: string;
}

/**
 * Displays a picker for increasing / decreasing the quantity of the given product in the basket
 * @param {ProductQuantityPickerProps} props
 * @returns {JSX.Element}
 */
const ProductQuantityPicker = ({
  id,
}: ProductQuantityPickerProps): JSX.Element => {
  const { addItemToBasket, removeItemFromBasket, numberOfGivenItemInBasket } =
    useBasketContext();
  return (
    <div className={s.wrapper}>
      <Button className={s.minus} onClick={() => removeItemFromBasket(id)}>
        -
      </Button>
      <p>{numberOfGivenItemInBasket(id)}</p>
      <Button className={s.plus} onClick={() => addItemToBasket(id)}>
        +
      </Button>
    </div>
  );
};

export default ProductQuantityPicker;
