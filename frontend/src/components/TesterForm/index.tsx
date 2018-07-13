import * as React from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router';
import { Dispatch } from 'redux';
import { IDispatchProps, StudentActions } from '../../actions/studentActions';
import { IAppState } from '../../types';
import { AnswerCollection } from './AnswerCollection';
import { AnswerForm } from './AnswerForm';

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  testIssuesList: [object];
  testState: [object];
}

interface IRouterParams {
  id: number;
}

type TProps = IDispatchProps & IStateProps & IRouterParams;

class TesterForm extends React.Component<TProps> {
  constructor(props: any) {
    super(props);
  }
  public componentWillMount() {
    this.props.studentActions.getTestIssues(this.props.id);
  }

  public render() {
    return(
      <div className='testAnswer content container'>
        <AnswerCollection />
        <AnswerForm  />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState, ownProps: RouteComponentProps<IRouterParams>): IStateProps & IRouterParams {
  return {
    serverConnectError: state.commonReducer.serverConnectError,
    serverDataError: state.commonReducer.serverDataError,
    authState: state.commonReducer.authState,
    testIssuesList: state.studentReducer.testIssuesList,
    testState: state.studentReducer.testState,
    id: ownProps.match.params.id,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    studentActions: new StudentActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(TesterForm);

export {connectApp as TesterForm};
