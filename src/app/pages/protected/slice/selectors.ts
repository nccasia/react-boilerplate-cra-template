import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.me || initialState;

export const selectMe = createSelector(
  [selectSlice],
  state => state,
);
