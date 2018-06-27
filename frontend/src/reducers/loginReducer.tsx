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
}

const initialState = {
  get state(): ILoginStoreState {
    return {
      loginState: false,
      loadingState: false,
      serverConnectError: false,
      dataAuthError: false,
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
      };
    case `${ILoginActionTypes.AUTH}${IAsyncLoginActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        dataAuthError: action.payload.dataAuthError,
      };
  }
  return state;
}
