import { DB } from '@app/types';
import { gql } from 'urql';

export interface GET_ACTIVE_BASKET {
  basket: {
    id: string;
    basket_products_aggregate: DB.Aggregate;
    basket_products: {
      id: string;
      product: Omit<DB.Product, 'created_at' | 'updated_at'>;
    }[];
  }[];
}

export const GET_ACTIVE_BASKET = gql<GET_ACTIVE_BASKET>`
  subscription GET_ACTIVE_BASKET {
    basket(where: { complete: { _eq: false } }) {
      id
      basket_products_aggregate {
        aggregate {
          count
        }
      }
      basket_products {
        id
        product {
          id
          name
          price
          description
          image_src
        }
      }
    }
  }
`;
