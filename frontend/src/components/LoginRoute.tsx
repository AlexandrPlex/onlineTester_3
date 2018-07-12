import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect, RouteProps} from 'react-router';
import {Route} from 'react-router-dom';
import { Dispatch } from 'redux';
import { AuthActions, IDispatchProps } from '../actions/authActions';
import { IAppState } from '../types';
import { LoadingComponent } from './LoadingComponent';

interface IStateProps {
  authState: boolean;
  role_type: string;
  loadingState: boolean;
  routeProps: any;
}

type IPropsState = IStateProps & IDispatchProps;

class LoginRoute extends React.Component<IPropsState, {loading: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  public componentWillMount() {
    this.props.authActions.onUpdateAuth().then( () => {
      this.setState({loading: this.props.loadingState});
    });
  }
  public render() {
    const {component: Component, ...rest} = this.props.routeProps;
    if (this.state.loading) {
      return <LoadingComponent/>;
    } else {
      if (!this.props.authState) {
          return <Route {...rest} render={ (props: any) => <Component {...props} {...this.props} />}/>;
      } else {
        return <Redirect push to={this.props.role_type}/>;
      }
    }
  }
}

function mapStateToProps(state: IAppState, routerProps: RouteProps): IStateProps {
  return {
    authState: state.commonReducer.authState,
    role_type: state.commonReducer.role_type,
    loadingState: state.commonReducer.loadingState,
    routeProps: routerProps,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    authActions: new AuthActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(LoginRoute);

export {connectApp as LoginRoute};
