import { QUERIES } from '@app/graphql';
import { useQuery } from 'urql';

export const useProducts = (
  filters: { categories: string[]; text?: string },
  orderBy?: QUERIES.GET_PRODUCTS_VARIABLES['order_by'],
) => {
  const [{ data, fetching, error }, refetchProducts] = useQuery({
    query: QUERIES.GET_PRODUCTS,
    variables: {
      categories: {
        category_id: filters.categories.length
          ? { _in: filters.categories }
          : { _nin: filters.categories },
      },
      order_by: orderBy,
      filter_text: `%${filters.text ?? ''}%`,
    },
  });

  return {
    products: data?.products || ([] as QUERIES.GET_PRODUCTS['products']),
    totalProducts: data?.products_aggregate.aggregate.count,
    fetching,
    error,
    refetchProducts,
  };
};
