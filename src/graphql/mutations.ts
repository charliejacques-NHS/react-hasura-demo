import { DB } from '@app/types';
import { gql } from 'urql';

interface NEW_PRODUCT {
  insert_products_one: {
    id: string;
  };
}

export interface NEW_PRODUCT_VARIABLES
  extends Omit<DB.Product, 'id' | 'created_at' | 'updated_at'> {
  categories: { category_id: string }[];
}

export const NEW_PRODUCT = gql<NEW_PRODUCT, NEW_PRODUCT_VARIABLES>`
  mutation NEW_PRODUCT(
    $name: String!
    $image_src: String
    $price: numeric!
    $description: String!
    $categories: [product_categories_insert_input!]!
  ) {
    insert_products_one(
      object: {
        name: $name
        image_src: $image_src
        price: $price
        description: $description
        categories: { data: $categories }
      }
    ) {
      id
    }
  }
`;
