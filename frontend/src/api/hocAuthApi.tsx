import axios, {AxiosPromise} from 'axios';
import {config} from '../config';

export function getRoleRequestAxios(): AxiosPromise {
  return axios.post(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.getRole}`)
    .then((response: any) => {
      if (response.status === 200 || 304) {
        return response.toString();
      }
    });
}

export function getRoleRequestFetch() {
  return fetch(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.getRole}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
    })
    .then((response) => {
      return response.json();
    })
    .catch( alert );
}
