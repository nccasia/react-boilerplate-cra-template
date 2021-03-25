import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';
import { AuthState } from './types';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);

export const selectAuthIsLogin = createSelector(
  [selectAuth],
  (state: AuthState) => !!state.accessToken,
);

export const selectAuthLoading = createSelector(
  [selectAuth],
  (state: AuthState) => state.loading,
);

export const selectAuthError = createSelector(
  [selectAuth],
  (state: AuthState) => state.error,
);

export const selectIsLoginSucceed = createSelector(
  [selectAuth],
  (state: AuthState) => !!state.isLoginSucceed,
);
