import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import * as authApi from './api';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from './const';
import { authSaga } from './saga';
import { AuthState, LoginPayload } from './types';
import { registerInterceptors } from './middleware';

const getInitialState = (): AuthState => {
  const initialAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const initialRefreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  return {
    accessToken: initialAccessToken || null,
    refreshToken: initialRefreshToken || null,
    isLoginSucceed: false,
    error: null,
    loading: 'idle',
    user: null,
  };
};

export const initialState: AuthState = getInitialState();

const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      // const data = authApi.login(payload)
      // return data
      return {
        payload,
        access: 'fake_access_token',
        refresh: 'fake_access_token',
      };
    } catch (e) {
      return rejectWithValue({
        message: 'Failed to log in with credential',
      });
    }
  },
);

const refresh = createAsyncThunk(
  'auth/refresh',
  async (payload: LoginPayload) => {
    const data = authApi.refresh();
    return data;
  },
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    enter(state) {
      state.isLoginSucceed = false;
    },
    logout(state) {
      const newState = getInitialState();
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = 'pending';
      })
      .addCase(login.rejected, state => {
        state.loading = 'rejected';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.isLoginSucceed = true;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      });

    builder
      .addCase(refresh.pending, state => {
        state.loading = 'pending';
      })
      .addCase(refresh.rejected, state => {
        state.loading = 'rejected';
      })
      .addCase(refresh.fulfilled, state => {
        state.loading = 'fulfilled';
      });
  },
});

export const actions = {
  ...slice.actions,
  login,
  refresh,
};

export const useAuthSlice = () => {
  const store = useStore();
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  registerInterceptors(store);
  return { actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
