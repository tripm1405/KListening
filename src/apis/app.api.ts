import axios from 'axios';
import qs from 'qs';
import KApi from '@krotohmi/k-api';
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

const AppApi = new KApi(AxiosInstance);

export default AppApi;
