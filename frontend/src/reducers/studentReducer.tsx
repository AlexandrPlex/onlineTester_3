import {Action} from 'redux';
import {IAsyncStudentActionTypes, IStudentActionTypes} from '../constants/studentConstants';

export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface IStudentStoreState {
  testListData: [object];
  loading: boolean;
  serverConnectError: boolean;
  serverDataError: boolean;
}

const initialState = {
  get state(): IStudentStoreState {
    return {
      testListData: [{}],
      loading: false,
      serverConnectError: false,
      serverDataError: false,
    };
  },
};

export default function studentReducer(state: IStudentStoreState = initialState.state, action: IActionType) {
  switch (action.type) {
    case `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true,
        serverConnectError: false,
        serverDataError: false,
      };
    case `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.SUCCESS}`:
      return {
        ...state,
        loading: false,
        testListData: action.payload,
      };
    case `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        serverDataError: action.payload.serverDataError,
      };
  }
  return state;
}
