import * as React from 'react';
import { connect } from 'react-redux';
import {RouteProps} from 'react-router';
import { Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AuthActions, IDispatchProps } from '../actions/authActions';
import { IAppState } from '../types';

interface IRouteState {
  component: any;
}

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  role_type: string;
  loadingState: boolean;
}

type IPropsState = IStateProps & IRouteState & RouteProps;

class PrivateRoute extends React.Component<IPropsState> {
  public render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={() => <Component />} />
    );
  }
}

function mapStateToProps(state: IAppState): IStateProps {
  return {
    serverConnectError: state.commonReducer.serverConnectError,
    serverDataError: state.commonReducer.serverDataError,
    authState: state.commonReducer.authState,
    role_type: state.commonReducer.role_type,
    loadingState: state.commonReducer.loadingState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    authActions: new AuthActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps/*, mapDispatchToProps*/)(PrivateRoute);

export {connectApp as PrivateRoute};
