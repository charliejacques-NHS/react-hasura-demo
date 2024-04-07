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

interface ADD_ITEM_TO_BASKET {
  insert_basket_products_one: {
    id: string;
  };
}

export interface ADD_ITEM_TO_BASKET_VARIABLES {
  basket_id: string;
  product_id: string;
}

export const ADD_ITEM_TO_BASKET = gql<
  ADD_ITEM_TO_BASKET,
  ADD_ITEM_TO_BASKET_VARIABLES
>`
  mutation ADD_ITEM_TO_BASKET($basket_id: uuid!, $product_id: uuid!) {
    insert_basket_products_one(
      object: { basket_id: $basket_id, product_id: $product_id }
    ) {
      id
    }
  }
`;

interface REMOVE_ITEM_FROM_BASKET {
  delete_basket_products_by_pk: {
    id: string;
  };
}

export interface REMOVE_ITEM_FROM_BASKET_VARIABLES {
  id: string;
}

export const REMOVE_ITEM_FROM_BASKET = gql<
  REMOVE_ITEM_FROM_BASKET,
  REMOVE_ITEM_FROM_BASKET_VARIABLES
>`
  mutation REMOVE_ITEM_FROM_BASKET($id: uuid!) {
    delete_basket_products_by_pk(id: $id) {
      id
    }
  }
`;

interface CREATE_NEW_BASKET {
  insert_basket_one: {
    id: string;
  };
}

export interface CREATE_NEW_BASKET_VARIABLES {
  user_id: string;
}

export const CREATE_NEW_BASKET = gql<
  CREATE_NEW_BASKET,
  CREATE_NEW_BASKET_VARIABLES
>`
  mutation CREATE_NEW_BASKET($user_id: uuid!) {
    insert_basket_one(object: { user_id: $user_id }) {
      id
    }
  }
`;

interface COMPLETE_BASKET {
  update_basket_by_pk: {
    id: string;
    complete: boolean;
  };
}

export interface COMPLETE_BASKET_VARIABLES {
  id: string;
}

export const COMPLETE_BASKET = gql<COMPLETE_BASKET, COMPLETE_BASKET_VARIABLES>`
  mutation COMPLETE_BASKET($id: uuid!) {
    update_basket_by_pk(pk_columns: { id: $id }, _set: { complete: true }) {
      id
      complete
    }
  }
`;
