import axios, {AxiosPromise} from 'axios';
import {config} from '../config';

export function getRoleRequest(): AxiosPromise {
  return axios.post(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.getRole}`)
    .then((response: any) => {
      if (response.status === 200 || 304) {
        return response;
      }
    });
}
