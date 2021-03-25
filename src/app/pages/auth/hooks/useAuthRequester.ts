import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthSlice } from '../slice';
import * as authSelectors from '../slice/selectors';
import { LoginPayload } from '../slice/types';

export const useAuthRequester = () => {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const isLoginSucceed = useSelector(authSelectors.selectIsLoginSucceed);
  const isLogin = useSelector(authSelectors.selectAuthIsLogin);
  const loading = useSelector(authSelectors.selectAuthLoading);
  const error = useSelector(authSelectors.selectAuthError);

  const login = useCallback(
    (payload: LoginPayload) => {
      dispatch(actions.login(payload));
    },
    [actions, dispatch],
  );

  const logout = useCallback(
    (payload: LoginPayload) => {
      dispatch(actions.logout());
    },
    [actions, dispatch],
  );

  const enter = useCallback(() => {
    dispatch(actions.enter());
  }, [actions, dispatch]);

  return {
    isLogin,
    isLoginSucceed,
    loading,
    error,
    enter,
    login,
    logout,
  };
};
