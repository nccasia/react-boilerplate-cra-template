import { AxiosResponse } from 'axios'
import { axiosApi } from 'utils/axios'
import { LoginPayload, LoginResponse } from './types'

export const login = async (payload: LoginPayload) => {
  const response = await axiosApi.post<LoginResponse>('/auth/login', payload)
  return response.data;
}


export const refresh = async () => {
  const response = await axiosApi.post<LoginResponse>('/auth/refresh');
  return response.data;
}

