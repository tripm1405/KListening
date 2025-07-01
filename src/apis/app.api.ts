import axios from 'axios';
import qs from 'qs';
import KApi from '@krotohmi/k-api';

const Domain = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:5000';

console.log('Domain', Domain);

const AxiosInstance = axios.create({
  baseURL: `${Domain}/api`,
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
      skipNulls: false,
    });
  },
});

const AppApi = new KApi(AxiosInstance);

export default AppApi;