import axios from 'axios';
import qs from 'qs';
import KAxios from '@krotohmi/axios';
import { ApiDomain } from '~/app.config';

const AxiosInstance = axios.create({
  baseURL: `${ApiDomain}/api`,
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
      skipNulls: false,
    });
  },
});

const AppApi = new KAxios(AxiosInstance);

export default AppApi;
