import { DB } from '@app/types';
import { gql } from 'urql';

interface GET_PRODUCTS {
  products: Pick<
    DB.Product,
    'id' | 'image_src' | 'name' | 'description' | 'price'
  > & {
    categories: {
      category: Pick<DB.Category, 'id' | 'name' | 'friendly_name'>;
    };
  };
  products_aggregate: DB.Aggregate<DB.Product>;
}

export const GET_PRODUCTS = gql<GET_PRODUCTS>`
  query GET_PRODUCTS {
    products {
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
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`;

interface GET_FEATURE_FLAGS {
  feature_flags: Pick<DB.FeatureFlag, 'id' | 'name' | 'enabled'>;
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
