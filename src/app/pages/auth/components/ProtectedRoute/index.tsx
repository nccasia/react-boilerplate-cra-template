/**
 *
 * ProtectedRoute
 *
 */

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

type Props = RouteProps & {
  component: any;
};

export const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}: Props) => {
  const { isLogin } = useAuthContext();
  return (
    <Route
      {...rest}
      render={props => {
        return isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    ></Route>
  );
};
