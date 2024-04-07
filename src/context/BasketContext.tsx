import { MUTATIONS, SUBSCRIPTIONS } from '@app/graphql';
import { PropsWithChildren, createContext, useCallback, useMemo } from 'react';
import { useMutation, useSubscription } from 'urql';
import { useAuthContext } from '.';

export interface BasketContextValue {
  /**
   * The user's current basket
   */
  basket?: SUBSCRIPTIONS.GET_ACTIVE_BASKET['basket'][number];
  /**
   * The number of items in the basket
   */
  totalItems: number;
  /**
   * The number of items in the basket
   */
  totalPrice: number;
  /**
   * The current loading state
   */
  fetching: boolean;
  /**
   * Function to add a new product to the basket
   * @param product_id The id of the product the user wants to add
   */
  addItemToBasket(product_id: string): Promise<void>;
  /**
   * Function to check whether an item is in the basket
   * @param product_id The id of the product being checked
   */
  itemInBasket(product_id: string): boolean;
  /**
   * Function to check how many of an item is in the basket
   * @param product_id The id of the product being checked
   */
  numberOfGivenItemInBasket(product_id: string): number;
  /**
   * Function to remove a product from the basket
   * @param id The id of the product to remove
   */
  removeItemFromBasket(id: string): Promise<void>;
  /**
   * Function to close the current basket
   */
  completeBasket(): Promise<void>;
}

const initialValue: BasketContextValue = {
  basket: undefined,
  totalItems: 0,
  totalPrice: 0,
  fetching: true,
  addItemToBasket: function (_product_id: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  removeItemFromBasket: function (_id: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  itemInBasket: function (_product_id: string): boolean {
    throw new Error('Function not implemented.');
  },
  numberOfGivenItemInBasket: function (_product_id: string): number {
    throw new Error('Function not implemented.');
  },
  completeBasket: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const BasketContext = createContext(initialValue);

/**
 * Provider component for {@link BasketContext}
 */
export const BasketProvider = ({ children }: PropsWithChildren) => {
  const { userId, authenticated } = useAuthContext();
  const [{ data, error, fetching }] = useSubscription(
    { query: SUBSCRIPTIONS.GET_ACTIVE_BASKET, pause: !authenticated },
    (_prev, res) => res,
  );
  const [_newItemResp, addItem] = useMutation(MUTATIONS.ADD_ITEM_TO_BASKET);
  const [_removedItemResp, removeItem] = useMutation(
    MUTATIONS.REMOVE_ITEM_FROM_BASKET,
  );
  const [_newBasket, createBasket] = useMutation(MUTATIONS.CREATE_NEW_BASKET);
  const [_completedBasket, completeBasket] = useMutation(
    MUTATIONS.COMPLETE_BASKET,
  );

  const totalPrice = useMemo(
    () =>
      data?.basket[0]?.basket_products
        .map(({ product }) => product.price)
        .reduce((acc, curr) => acc + curr) || 0,
    [data],
  );

  if (error) console.error('ERROR SUBSCRIBING TO BASKET', error);

  const addItemToBasket = async (product_id: string) => {
    let basket_id = data?.basket[0]?.id;
    if (!basket_id && userId)
      basket_id = await createBasket({ user_id: userId }).then(
        ({ data }) => data?.insert_basket_one.id,
      );

    basket_id && addItem({ basket_id, product_id });
  };

  const itemInBasket = useCallback(
    (product_id: string) =>
      !!data?.basket[0]?.basket_products
        .map(({ product }) => product.id)
        .includes(product_id),
    [data],
  );

  const numberOfGivenItemInBasket = useCallback(
    (product_id: string) =>
      data?.basket[0]?.basket_products
        .map(({ product }) => product.id)
        .filter(id => id === product_id).length || 0,
    [data],
  );

  const removeItemFromBasket = async (id: string) => {
    const chosenProduct = data?.basket[0]?.basket_products.find(
      ({ product }) => id === product.id,
    );

    if (chosenProduct) removeItem({ id: chosenProduct.id });
  };

  return (
    <BasketContext.Provider
      value={{
        basket: data?.basket[0],
        totalItems:
          data?.basket[0]?.basket_products_aggregate.aggregate.count || 0,
        totalPrice,
        fetching,
        addItemToBasket,
        itemInBasket,
        numberOfGivenItemInBasket,
        removeItemFromBasket,
        completeBasket: () =>
          Promise.resolve(
            data?.basket[0].id
              ? completeBasket({ id: data.basket[0].id })
              : undefined,
          ).then(res => {
            if (res?.error || !res?.data)
              throw new Error('Basket not fulfilled');
          }),
      }}>
      {children}
    </BasketContext.Provider>
  );
};
