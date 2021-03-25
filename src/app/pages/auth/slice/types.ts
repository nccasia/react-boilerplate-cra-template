/* --- STATE --- */
import { LoadingState } from 'types/system';

export interface AuthUser {}

export interface LoginPayload {}

export interface LoginResponse {}
export interface AuthState {
  user: AuthUser | null;
  loading: LoadingState;
  isLoginSucceed: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: any;
}
