import {Action} from 'redux';
import {IAsyncStudentActionTypes, IStudentActionTypes} from '../constants/studentConstants';

export interface IActionType extends Action {
  type: string;
  payload: any;
}

export interface IStudentStoreState {
  testListData: [object];
  subjects: [string];
  testIssuesList: [object];
  testState: [object];
  activeTest: number;
  loading: boolean;
  serverConnectError: boolean;
  serverDataError: boolean;
}

const initialState = {
  get state(): IStudentStoreState {
    return {
      testListData: [{}],
      testIssuesList: [{}],
      testState: [{}],
      activeTest: 0,
      subjects: [''],
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
        testListData: action.payload.testList,
        subjects: action.payload.subjects,
      };
    case `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        serverDataError: action.payload.serverDataError,
      };
    case `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true,
        serverConnectError: false,
        serverDataError: false,
      };
    case `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.SUCCESS}`:
      return {
        ...state,
        loading: false,
        testIssuesList: action.payload,
      };
    case `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.FAILURE}`:
      return {
        ...state,
        loadingState: false,
        serverConnectError: action.payload.serverConnectError,
        serverDataError: action.payload.serverDataError,
      };
    case `${IStudentActionTypes.CHENGETEST}`:
      return {
        ...state,
        activeTest: action.payload,
      };
  }
  return state;
}
