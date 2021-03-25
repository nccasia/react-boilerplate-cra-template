import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
