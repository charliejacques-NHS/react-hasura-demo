import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRouteWrapper } from '@app/components';
import { Basket, Home, NotFound, SignIn } from '@app/pages';
import { ROUTES } from '@app/types';
import { useSiteSettingsContext } from '@app/context';

/**
 * Defines the routes for the application
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => {
  const { siteTitle } = useSiteSettingsContext();
  return (
    <Routes>
      <Route element={<Layout pageTitle={siteTitle} />}>
        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRouteWrapper />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BASKET} element={<Basket />} />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.ANY} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
