import {Dispatch} from 'redux';
import {authenticationRequest, getRoleRequest} from '../api/loginApi';
import {IAsyncLoginActionTypes, ILoginActionTypes} from '../constants/loginConstans';

export interface IDispatchProps {
  loginActions: LoginActions;
}

export class LoginActions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }
  public onHandelAuthentication = (login: string, password: string) => {
    this.dispatch({type: `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.BEGIN}`});
    return new Promise((resolve, reject) => {
      authenticationRequest(login, password)
        .then((res: any) => {
          if (res.data.auth) {
            this.dispatch({type: `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.SUCCESS}`});
            resolve(res.data);
          } else {
            this.dispatch({type: `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.FAILURE}`, payload: {serverConnectError: false, dataAuthError: true}});
            resolve(res.data);
          }
        })
        .catch((error: Error) => {
          this.dispatch({type: `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.FAILURE}`, payload: {serverConnectError: true, dataAuthError: false}});
          reject(error);
        });
    });
  }

  public onGetRole = () => {
    return getRoleRequest();
  }
}
