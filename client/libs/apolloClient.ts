// // lib/apolloClient.ts
// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const initilizeApolloClient = new ApolloClient({
//   uri: 'http://localhost:3001/graphql', // Your backend URL
//   cache: new InMemoryCache(),
// });

// export default initilizeApolloClient;
import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client';
import { Observable } from 'zen-observable-ts';

// Singleton Apollo Client for client-side use
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let accessToken: string | null = null;
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken');
}

// HTTP link for GraphQL requests
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include', // This is important for sending cookies
  fetchOptions: {
    mode: 'cors',
  },
});

// Middleware to attach access token
const authLink = new ApolloLink((operation, forward) => {
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }));
  }
  return forward(operation);
});

// Error handling and refresh logic
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  const unauthenticated = graphQLErrors?.some((err) => err.extensions?.code === 'UNAUTHENTICATED');

  if (unauthenticated) {
    // Check if we've already tried to refresh the token for this operation
    const context = operation.getContext();
    const isRetry = context.isRetry;

    if (isRetry) {
      // If this is already a retry, don't try again to avoid infinite loops
      console.error('Token refresh failed, not retrying to avoid loop');
      return;
    }

    return new Observable((observer) => {
      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // important to send the HttpOnly cookie
        body: JSON.stringify({
          query: `
            mutation {
              refreshAccessToken {
                accessToken
              }
            }
          `,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newToken = result?.data?.refreshAccessToken?.accessToken;
          if (!newToken) throw new Error('Failed to refresh access token');

          accessToken = newToken;
          // Update localStorage with the new token
          localStorage.setItem('accessToken', newToken);

          // Update the original operation with new token and mark as retry
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
            isRetry: true, // Mark this operation as a retry
          }));

          // Retry the failed operation
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };
          forward(operation).subscribe(subscriber);
        })
        .catch((err) => {
          console.error('Token refresh failed', err);
          observer.error(err);
        });
    });
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Function to manually set token after login
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Function to create a new Apollo Client
export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

// Initialize Apollo Client with optional preloaded state
export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSR, always return a new client
  if (typeof window === 'undefined') return _apolloClient;

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// React hook for using Apollo Client
export function useApollo(
  initialState: NormalizedCacheObject | null
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
