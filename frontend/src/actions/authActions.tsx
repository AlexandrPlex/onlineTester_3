import {Dispatch} from 'redux';
import {authenticationRequest, logOutRequest} from '../api/authApi';
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
        .catch((error: Error) => {
          this.dispatch({type: `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
          reject(error);
        });
    });
  }
  public onHandleLogOut = () => {
    return new Promise((resolve: any) => {
      logOutRequest()
        .then(() => {
          this.dispatch({type: `${IAuthActionTypes.LOGOUT}`});
          resolve();
        });
    });
  }
  public onUpdateAuth =  (auth: boolean, role: string) => {
    const res = {authState: auth, role_type: role};
    return this.dispatch({type: `${IAuthActionTypes.UPDATEDATA}`, payload: res});
  }
}
