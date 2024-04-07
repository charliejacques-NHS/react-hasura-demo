import { QUERIES } from '@app/graphql';
import { FEATURE_FLAGS } from '@app/types';
import { PropsWithChildren, createContext } from 'react';
import { useQuery } from 'urql';
import { useAuthContext } from '.';

export interface FeatureFlagsContextValue {
  /**
   * Function to check if a feature flag is enabled
   * @param flag The feature flag you want to check
   */
  checkFeatureEnabled(flag: FEATURE_FLAGS): boolean;
}

const initialValue: FeatureFlagsContextValue = {
  checkFeatureEnabled: function (_flag: FEATURE_FLAGS): boolean {
    throw new Error('Function not implemented.');
  },
};

export const FeatureFlagsContext = createContext(initialValue);

/**
 * Provider component for {@link FeatureFlagsContext}
 */
export const FeatureFlagsProvider = ({ children }: PropsWithChildren) => {
  const { authenticated } = useAuthContext();
  const [{ data, fetching, error }] = useQuery({
    query: QUERIES.GET_FEATURE_FLAGS,
    pause: !authenticated,
  });

  const checkFeatureEnabled = (flag: FEATURE_FLAGS) =>
    !fetching && !!data?.feature_flags.map(({ name }) => name).includes(flag);

  if (error) console.error('ERROR FETCHING FEATURE FLAGS', error);

  return (
    <FeatureFlagsContext.Provider value={{ checkFeatureEnabled }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
