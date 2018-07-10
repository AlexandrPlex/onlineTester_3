import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IDispatchProps, StudentActions } from '../../actions/studentActions';
import { IAppState } from '../../types';
import { AnswerForm } from './AnswerForm';

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  activeTest: number;
  testIssuesList: [object];
  testState: [object];
}

type TProps = IDispatchProps & IStateProps;

class TesterForm extends React.Component<TProps> {
  public static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props: any, context: any) {
    super(props, context);
  }
  public componentWillMount() {
    this.props.studentActions.getTestIssues(this.props.activeTest);
    console.log(this.props.testState);
  }

  public render() {
    return(
      <div className='row'>
        {this.context.router.history.param.id}
        <AnswerForm />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState): IStateProps {
  return {
    serverConnectError: state.commonReducer.serverConnectError,
    serverDataError: state.commonReducer.serverDataError,
    authState: state.commonReducer.authState,
    activeTest: state.studentReducer.activeTest,
    testIssuesList: state.studentReducer.testIssuesList,
    testState: state.studentReducer.testState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    studentActions: new StudentActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(TesterForm);

export {connectApp as TesterForm};
