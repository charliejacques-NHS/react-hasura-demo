import { useAuthContext } from '@app/context';
import { GRAPHQL_URL } from '@app/util/config';
import { useMemo } from 'react';
import { Client, cacheExchange, fetchExchange } from 'urql';

/**
 * Custom hook to create a new URQL client. Written as a hook so it can access the AuthContext
 */
export const useUrqlClient = () => {
  const { role, userId } = useAuthContext();
  const headers = useMemo<{ [key: string]: string }>(
    () => ({ 'x-hasura-role': role ?? 'unauthorized' }),
    [role, userId],
  );

  if (userId) headers['x-hasura-user-id'] = userId;

  return new Client({
    url: GRAPHQL_URL,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({
      headers,
    }),
  });
};
