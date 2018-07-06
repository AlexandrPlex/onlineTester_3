import { Dispatch } from 'redux';
import { getTestListRequest } from '../api/studentApi';
import { IAsyncStudentActionTypes, IStudentActionTypes } from '../constants/studentConstants';

export interface IDispatchProps {
  studentActions: StudentActions;
}

export class StudentActions {
  constructor(private dispatch: Dispatch<IDispatchProps>) {
  }
  public onLoadTestListData = () => {
    this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.BEGIN}`});
    getTestListRequest()
      .then((res: any) => {
        if (!res.data.error) {
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.SUCCESS}`, payload: res.data});
        } else {
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
      });
  }
}
