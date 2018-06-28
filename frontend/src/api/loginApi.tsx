import axios, { AxiosPromise } from 'axios';

import {config} from '../config';

export function authenticationRequest(login: string, password: string): AxiosPromise {
  return axios.post(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.auth}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      email: login,
      password,
    })
    .then((response: any) => {
      if (response.status === 200 || 304) {
        return response;
      }
    });
}
