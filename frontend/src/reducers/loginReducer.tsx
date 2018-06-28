import {Action} from 'redux';
import {IAsyncLoginActionTypes, ILoginActionTypes} from '../constants/loginConstans';

export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface ILoginStoreState {
  loginState: boolean;
  loadingState: boolean;
  serverConnectError: boolean;
  dataAuthError: boolean;
  role_type: string;
}

const initialState = {
  get state(): ILoginStoreState {
    return {
      loginState: false,
      loadingState: false,
      serverConnectError: false,
      dataAuthError: false,
      role_type: '',
    };
  },
};

export default function loginReducer(state: ILoginStoreState = initialState.state, action: IActionType) {
  switch (action.type) {
    case `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.BEGIN}`:
      return {
        ...state,
        loadingState: true,
        serverConnectError: false,
        dataAuthError: false,
      };
    case `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.SUCCESS}`:
      return {
        ...state,
        loadingState: false,
        loginState: true,
        role_type: action.payload.role_type,
      };
    case `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        dataAuthError: action.payload.dataAuthError,
      };
    case `${ILoginActionTypes.UPDATEROLE}${IAsyncLoginActionTypes.BEGIN}`:
      return {
        ...state,
        loadingState: true,
      };
    case `${ILoginActionTypes.UPDATEROLE}${IAsyncLoginActionTypes.SUCCESS}`:
      return {
        ...state,
        loadingState: false,
        loginState: action.payload.loginState,
        role_type: action.payload.role_type,
      };
    case `${ILoginActionTypes.UPDATEROLE}${IAsyncLoginActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        dataAuthError: action.payload.dataAuthError,
      };
  }
  return state;
}
