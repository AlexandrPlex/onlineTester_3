import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IDispatchProps, StudentActions } from '../../actions/studentActions';
import { IAppState } from '../../types';
import { AnswerForm } from './AnswerForm';

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  testIssuesList: [object];
  testState: [object];
  id: number;
}

interface IRouterProps {
  id: number;
}

type ISProps = IStateProps & IRouterProps;

type TProps = IDispatchProps & IStateProps;

class TesterForm extends React.Component<TProps> {
  public static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props: any, context: any) {
    super(props, context);
  }
  public componentWillMount() {
    console.log(this.props.id);
    this.props.studentActions.getTestIssues(this.props.id);
  }

  public render() {
    return(
      <div>
        <AnswerForm  />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState, ownProps: RouteComponentProps<IRouterProps>): ISProps {
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
