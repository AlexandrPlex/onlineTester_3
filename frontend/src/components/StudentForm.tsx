import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IDispatchProps, StudentActions } from '../actions/studentActions';
import { IAppState } from '../types';
import { SubjectsTest } from './subjectsTest';
import { TestList } from './testList';

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  role_type: string;
  testListData: [object];
  subjects: [string];
  activeTest: number;
}

type TProps = IDispatchProps & IStateProps;

class StudentForm extends React.Component<TProps> {
  public static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props: any, context: any) {
    super(props, context);
  }
  public componentWillMount() {
    this.props.studentActions.onLoadTestListData();
  }
  public onFilter = (subject: string) => {
    if (subject === 'all') {
      this.props.studentActions.onLoadTestListData();
    } else {
      this.props.studentActions.onFilterData(subject);
    }
  }
  public onActiveTest = (idTest: number) => {
    this.props.studentActions.chengeTest(idTest);
    return this.context.router.history.push({pathname: '/student/test', serch: {id: '3'}});
  }
  public render() {
    return(
      <div className='row'>
        <SubjectsTest subjects={this.props.subjects} onFilter={this.onFilter} />
        <TestList testList={ this.props.testListData } onActiveTest={this.onActiveTest} />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState): IStateProps {
  return {
    serverConnectError: state.commonReducer.serverConnectError,
    serverDataError: state.commonReducer.serverDataError,
    authState: state.commonReducer.authState,
    role_type: state.commonReducer.role_type,
    testListData: state.studentReducer.testListData,
    subjects: state.studentReducer.subjects,
    activeTest: state.studentReducer.activeTest,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    studentActions: new StudentActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(StudentForm);

export {connectApp as StudentForm};
