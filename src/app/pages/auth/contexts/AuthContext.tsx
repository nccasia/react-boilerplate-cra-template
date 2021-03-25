import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LoadingState } from 'types/system';
import * as authSelectors from '../slice/selectors';
import { useAuthSlice } from '../slice';
import { LoginPayload } from '../slice/types';
import { AsyncThunkPayloadCreatorReturnValue } from '@reduxjs/toolkit';

export interface AuthContextValue {
  isLogin: boolean;
  loading: LoadingState;
  error: any;
  login: any;
  logout: any;
}

const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue,
);

export const AuthContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = props => {
  const history = useHistory();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const isLogin = useSelector(authSelectors.selectAuthIsLogin);
  const loading = useSelector(authSelectors.selectAuthLoading);
  const error = useSelector(authSelectors.selectAuthError);

  const login = React.useCallback(
    async (payload: LoginPayload) => {
      const result = (await dispatch(
        actions.login(payload),
      )) as AsyncThunkPayloadCreatorReturnValue<any, any>;
      if (!result.error) {
        history.push('/i');
      }
    },
    [actions, history, dispatch],
  );

  const logout = React.useCallback(async () => {
    const result = (await dispatch(
      actions.logout(),
    )) as AsyncThunkPayloadCreatorReturnValue<any, any>;
    if (!result.error) {
      history.push('/home');
    }
  }, [actions, history, dispatch]);

  const contextValue = React.useMemo<AuthContextValue>(
    () => ({
      isLogin,
      loading,
      error,
      login,
      logout,
    }),
    [isLogin, loading, error, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
