import { DB, QueryFilter, QueryOrderBy } from '@app/types';
import { gql } from 'urql';

export interface GET_PRODUCTS {
  products: (Pick<
    DB.Product,
    'id' | 'image_src' | 'name' | 'description' | 'price'
  > & {
    categories: {
      category: Pick<DB.Category, 'id' | 'name' | 'friendly_name'>;
    }[];
  })[];
  products_aggregate: DB.Aggregate<DB.Product>;
}

export interface GET_PRODUCTS_VARIABLES {
  categories: QueryFilter<{ category_id: string }>;
  order_by?: QueryOrderBy<
    DB.Product & { categories: { category: DB.Category } }
  >[];
  filter_text: string;
}

export const GET_PRODUCTS = gql<GET_PRODUCTS, GET_PRODUCTS_VARIABLES>`
  query GET_PRODUCTS(
    $categories: product_categories_bool_exp!
    $order_by: [products_order_by!]
    $filter_text: String!
  ) {
    products(
      where: {
        categories: $categories
        _or: [
          { name: { _ilike: $filter_text } }
          { description: { _ilike: $filter_text } }
        ]
      }
      order_by: $order_by
    ) {
      id
      name
      description
      price
      image_src
      categories {
        category {
          id
          name
          friendly_name
        }
      }
    }
    products_aggregate(
      where: {
        categories: $categories
        _or: [
          { name: { _ilike: $filter_text } }
          { description: { _ilike: $filter_text } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

interface GET_FEATURE_FLAGS {
  feature_flags: Pick<DB.FeatureFlag, 'id' | 'name' | 'enabled'>[];
}

export const GET_FEATURE_FLAGS = gql<GET_FEATURE_FLAGS>`
  query GET_FEATURE_FLAGS {
    feature_flags(where: { enabled: { _eq: true } }) {
      id
      name
      enabled
    }
  }
`;

interface GET_CATEGORIES {
  categories: Pick<DB.Category, 'id' | 'name' | 'friendly_name'>[];
}

export const GET_CATEGORIES = gql<GET_CATEGORIES>`
  query GET_CATEGORIES {
    categories {
      id
      name
      friendly_name
    }
  }
`;
