import { ILoginStoreState } from '../reducers/loginReducer';

// Global State
export interface IAppState {
  loginReducer: ILoginStoreState;
}
