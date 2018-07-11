import * as React from 'react';
import {RouteProps} from 'react-router';
import { Route } from 'react-router-dom';

interface IState {
  component: any;
}

type IPropsState = IState & RouteProps;

export class PrivateRoute extends React.Component<IPropsState> {
  public render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={() => <Component />} />
    );
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: state.user.isAuthenticated,
// });
//
// export default connect(mapStateToProps)(PrivateRoute);
