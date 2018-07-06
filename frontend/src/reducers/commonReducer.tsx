import {Action} from 'redux';
import {IAsyncAuthActionTypes, IAuthActionTypes} from '../constants/authConstans';

export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface ICommonStoreState {
  authState: boolean;
  loadingState: boolean;
  serverConnectError: boolean;
  serverDataError: boolean;
  role_type: string;
}

const initialState = {
  get state(): ICommonStoreState {
    return {
      authState: false,
      loadingState: false,
      serverConnectError: false,
      serverDataError: false,
      role_type: '',
    };
  },
};

export default function commonReducer(state: ICommonStoreState = initialState.state, action: IActionType) {
  switch (action.type) {
    case `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.BEGIN}`:
      return {
        ...state,
        loadingState: true,
        serverConnectError: false,
        serverDataError: false,
      };
    case `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.SUCCESS}`:
      return {
        ...state,
        loadingState: false,
        authState: true,
        role_type: action.payload.role_type,
      };
    case `${IAuthActionTypes.AUTH}${IAsyncAuthActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        serverDataError: action.payload.serverDataError,
      };
    case `${IAuthActionTypes.LOGOUT}`:
      return {
        ...state,
        authState: false,
        role_type: null,
      };
    case `${IAuthActionTypes.UPDATEDATA}`:
      return {
        ...state,
        authState: action.payload.authState,
        role_type: action.payload.role_type,
      };
  }
  return state;
}
