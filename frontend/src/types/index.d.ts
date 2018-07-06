import { ICommonStoreState } from '../reducers/commonReducer';
import { IStudentStoreState } from '../reducers/studentReducer';

// Global State
export interface IAppState {
  commonReducer: ICommonStoreState;
  studentReducer: IStudentStoreState;
}
