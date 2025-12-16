import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4200',
  withCredentials: true,
});

api.interceptors.response
  .use
  // (response) => {
  //   return response;
  // },
  // /* Нужно будет обрабоать ошибку 401 и делать редирект */
  // (error: AxiosError) => {
  //   console.error('API Ошибка:', error.response?.data || error.message);
  //
  //   if (error.status !== 500) {
  //     handleError(error);
  //   }
  //
  //   return Promise.reject(error);
  // },
  ();
