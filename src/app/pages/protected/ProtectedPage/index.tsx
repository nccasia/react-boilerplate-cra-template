/**
 *
 * ProtectedPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { ProtectedLayout } from '../components/ProtectedLayout';
import { AccountPage } from 'app/pages/protected/account/AccountPage';
import { ProtectedContextProvider } from '../contexts/ProtectedContext';
import { Redirect, Route, useRouteMatch } from 'react-router';

interface Props {
  children: JSX.Element;
}

export function ProtectedPage(props: Props) {
  const { path } = useRouteMatch();
  return (
    <ProtectedContextProvider>
      <ProtectedLayout>
        <Route path={`${path}/account`} component={AccountPage}></Route>
        <Redirect exact path={`${path}`} to={`${path}/account`}></Redirect>
      </ProtectedLayout>
    </ProtectedContextProvider>
  );
}
