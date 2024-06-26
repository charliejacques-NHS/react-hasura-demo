import { useMemo } from 'react';
import {
  Client,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql';
import { useAuthContext } from '@app/context';
import {
  GRAPHQL_API_SECRET,
  GRAPHQL_URL,
  GRAPHQL_WS_URL,
} from '@app/util/config';
import { createClient as createWSClient } from 'graphql-ws';

/**
 * Custom hook to create a new URQL client. Written as a hook so it can access the AuthContext
 */
export const useUrqlClient = () => {
  const { role, userId } = useAuthContext();
  const headers = useMemo<{ [key: string]: string }>(
    () => ({
      'x-hasura-role': role ?? 'unauthorized',
      'x-hasura-admin-secret': GRAPHQL_API_SECRET,
    }),
    [role, userId],
  );

  if (userId) headers['x-hasura-user-id'] = userId;

  const wsClient = createWSClient({
    url: GRAPHQL_WS_URL,
    connectionParams: async () => ({ headers }),
  });

  return new Client({
    url: GRAPHQL_URL,
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          const input = { ...request, query: request.query || '' };
          return {
            subscribe(sink) {
              const unsubscribe = wsClient.subscribe(input, sink);
              return { unsubscribe };
            },
          };
        },
      }),
    ],
    fetchOptions: () => ({
      headers,
    }),
  });
};
