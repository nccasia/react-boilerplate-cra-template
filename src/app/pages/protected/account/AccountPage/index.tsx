/**
 *
 * AccountPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { MyProfilePage } from 'app/pages/protected/account/MyProfilePage';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
interface Props {}

export function AccountPage(props: Props) {
  const { path } = useRouteMatch();
  return (
    <Div>
      <Switch>
        <Route path={`${path}/profile`} component={MyProfilePage}></Route>
        <Redirect exact path={`${path}`} to={`${path}/profile`} />
      </Switch>
    </Div>
  );
}

const Div = styled.div``;
