/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { PublicRoute } from './pages/auth/components/PublicRoute';
import { AuthPage } from './pages/auth/AuthPage';
import { ProtectedRoute } from './pages/auth/components/ProtectedRoute';
import { ProtectedPage } from './pages/protected/ProtectedPage';
import { AuthContextProvider } from './pages/auth/contexts/AuthContext';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <AuthContextProvider>
        <Switch>
          <PublicRoute path={'/auth'} component={AuthPage} />
          <Route exact path={'/home'} component={HomePage} />
          <ProtectedRoute
            path={'/i'}
            component={ProtectedPage}
          ></ProtectedRoute>
          <Redirect exact path={'/login'} to={'/auth/login'}></Redirect>
          <Redirect exact path={'/register'} to={'/auth/register'}></Redirect>
          <Redirect exact path={'/forgot'} to={'/auth/forgot'}></Redirect>
          <Redirect exact path={'/reset'} to={'/auth/reset'}></Redirect>
          <Route component={NotFoundPage} />
        </Switch>
      </AuthContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
