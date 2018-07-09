import { Dispatch } from 'redux';
import {getTestIssuesRequest, getTestListRequest} from '../api/studentApi';
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
          const set = new Set();
          res.data.forEach((el: any) => {
            set.add(el.subjects);
          });
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.SUCCESS}`, payload: { testList: res.data, subjects: [...set]}});
        } else {
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
      });
  }
  public onFilterData = (filter: string) => {
    this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.BEGIN}`});
    getTestListRequest()
      .then((res: any) => {
        if (!res.data.error) {
          const set = new Set();
          res.data.forEach((el: any) => {
            set.add(el.subjects);
          });
          const data = res.data.filter((el: any) => {
            if (el.subjects === filter) {
              return el;
            }
          });
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.SUCCESS}`, payload: { testList: data, subjects: [...set]}});
        } else {
          this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.dispatch({type: `${IStudentActionTypes.TESTLISTREQUEST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
      });
  }
  public getTestIssues = (idTest: number) => {
    this.dispatch({type: `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.BEGIN}`});
    getTestIssuesRequest(idTest)
      .then((res: any) => {
        if (!res.data.error) {
          this.dispatch({type: `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.SUCCESS}`, payload: res.data});
        } else {
          this.dispatch({type: `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: false, serverDataError: true}});
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.dispatch({type: `${IStudentActionTypes.TESTISSUESLIST}${IAsyncStudentActionTypes.FAILURE}`, payload: {serverConnectError: true, serverDataError: false}});
      });
  }
  public chengeTest = (idTest: number) => {
    this.dispatch({type: IStudentActionTypes.CHENGETEST, payload: idTest});
  }
}
