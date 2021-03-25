import { AsyncThunkAction } from '@reduxjs/toolkit';
import {
  take,
  call,
  put,
  select,
  takeLatest,
  ActionPattern,
  all,
} from 'redux-saga/effects';
import { actions } from '.';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './const';
import { axiosApi } from 'utils/axios';

function saveTokens(action) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, action.payload.access);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, action.payload.refresh);
  axiosApi.defaults.headers['Authorization'] = action.payload.accessToken;
}

function* resetState(action) {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  yield put({ type: 'store/reset' });
}

export function* authSaga() {
  yield takeLatest(actions.login.fulfilled.type, saveTokens);
  yield takeLatest(actions.refresh.fulfilled.type, saveTokens);
  yield takeLatest(actions.logout.type, resetState);
}
