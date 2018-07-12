import axios, { AxiosPromise } from 'axios';

import {config} from '../config';

export function getTestListRequest(): AxiosPromise {
  return axios.post(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.getTestListData}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response: any) => {
      if (response.status === 200 || 304) {
        return response;
      }
    });
}
export function getTestIssuesRequest(idTest: number): AxiosPromise {
  return axios.post(`${config.apiPrefix}:${config.serverPort}/${config.rootRoutes.getIssues}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      idTest,
    })
    .then((response: any) => {
      if (response.status === 200 || 304) {
        return response;
      }
    });
}
