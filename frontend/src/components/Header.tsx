import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AuthActions, IDispatchProps } from '../actions/authActions';
import { IAppState } from '../types';

interface IHeaderProps {
  authState: boolean;
  role_type: string;
}

type TProps = IDispatchProps & IHeaderProps;

class Header extends React.PureComponent<TProps> {
  public static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props: any, context: any) {
    super(props, context);
  }
  public onHendleLogOut = (event: any) => {
    event.preventDefault();
    this.props.authActions.onHandleLogOut().then(() => {
      this.context.router.history.push('/');
    });
  }
  public render() {
    return <nav>
      <div className='nav-wrapper'>
        <div className='container'>
          <span className='brand-logo'><NavLink exact={true} activeClassName='active-link' to={this.props.authState ? this.props.role_type : '/'}>Tester Online</NavLink></span>
          <ul >
            {
              this.props.authState ?
              <NavLink onClick={this.onHendleLogOut} className='right' to=''>Logout</NavLink> :
               null
            }
          </ul>
        </div>
      </div>
    </nav>;
  }
}

function mapStateToProps(state: IAppState): IHeaderProps {
  return {
    authState: state.commonReducer.authState,
    role_type: state.commonReducer.role_type,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    authActions: new AuthActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(Header);

export {connectApp as Header};
