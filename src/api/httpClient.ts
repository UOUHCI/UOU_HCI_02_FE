import axios from 'axios';

export const httpClient = axios.create({
  baseURL: '/mock-api',
  timeout: 500,
});
