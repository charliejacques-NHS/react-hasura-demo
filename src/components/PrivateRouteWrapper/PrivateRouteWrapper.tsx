import { useAuthContext } from '@app/context';
import { ROUTES } from '@app/types';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * This component will stop the user from navigating to certain routes if they are "unauthenticated" i.e. don't have a `userId` or `role`
 */
const PrivateRouteWrapper = () => {
  const { authenticated } = useAuthContext();

  return authenticated ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRouteWrapper;
