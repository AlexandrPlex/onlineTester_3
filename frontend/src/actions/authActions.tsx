import {Dispatch} from 'redux';
import {authenticationRequest, getRoleRequestAxios, logOutRequest} from '../api/authApi';
import {IAsyncAuthActionTypes, IAuthActionTypes} from '../constants/authConstans';

export interface IDispatchProps {
  authActions: AuthActions;
}

export class AuthActions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }
  public onHandelAuthentication = (login: string, password: string) => {
    this.dispatch({type: `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.BEGIN}`});
    return new Promise((resolve, reject) => {
      authenticationRequest(login, password)
        .then((res: any) => {
          if (res.data.auth) {
            this.dispatch({type: `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.SUCCESS}`, payload: {role_type: res.data.role_type}});
            resolve(res.data);
          } else {
            this.dispatch({type: `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
            resolve(res.data);
          }
        })
        .catch((error: any) => {
          this.dispatch({type: `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
          reject(error);
        });
    });
  }
  public onHandleLogOut = () => {
    return new Promise((resolve: any) => {
      logOutRequest()
        .then(() => {
          console.log('logout');
          this.dispatch({type: `${IAuthActionTypes.LOGOUT}`});
          resolve();
        });
    });
  }
  public onUpdateAuth =  () => {
    this.dispatch({type: `${IAuthActionTypes.UPDATEDATA}${IAsyncAuthActionTypes.BEGIN}`});
    return new Promise((resolve, reject) => {
      getRoleRequestAxios()
        .then((res: any) => {
          if (res.data.auth) {
            this.dispatch({type: `${IAuthActionTypes.UPDATEDATA}${IAsyncAuthActionTypes.SUCCESS}`, payload: {authState: res.data.auth, role_type: res.data.role_type}});
          } else {
            this.dispatch({type: `${IAuthActionTypes.UPDATEDATA}${IAsyncAuthActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
          }
          resolve(res);
        })
        .catch((error: any) => {
          this.dispatch({type: `${IAuthActionTypes.UPDATEDATA}${IAsyncAuthActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
          reject(error);
        });
    });
  }
}
