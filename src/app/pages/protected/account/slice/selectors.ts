import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.account || initialState;

export const selectAccount = createSelector(
  [selectSlice],
  state => state,
);
