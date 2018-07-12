import * as hash from 'object-hash';
import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import { Dispatch } from 'redux';
import { AuthActions, IDispatchProps } from '../actions/authActions';
import { IAppState } from '../types';

interface IStateProps {
  serverConnectError: boolean;
  serverDataError: boolean;
  authState: boolean;
  role_type: string;
}

type TProps = IDispatchProps & IStateProps;

class LoginForm extends React.PureComponent<TProps, {loginValue: string, passwordValue: string}> {
  constructor(props: any) {
    super(props);
  }
  public onHandleLogin = () => {
    if (Boolean(this.state.loginValue) && Boolean(this.state.passwordValue)) {
      this.props.authActions.onHandelAuthentication(this.state.loginValue, hash.sha1(this.state.passwordValue))
        .then(() => {
          if (this.props.authState) {
            this.onRedirect();
          }
        });
    }
  }
  public onRedirect = () => {
    return <Redirect push to={this.props.role_type}/>;
  }

  public render() {
    return(
      <form className='collection-item waves-effect' onSubmit={(e: any) => { e.preventDefault(); } }>
        <div>
        <input id='email' onChange={(event: any) => {this.setState({loginValue: event.target.value}); } } className={this.props.serverDataError ? 'input-field invalid'  : 'input-field'} type='email' required placeholder='Введите Email' />
        <input id='password' onChange={(event: any) => {this.setState({passwordValue: event.target.value}); } } className={this.props.serverDataError ? 'input-field invalid'  : 'input-field'}type='password' required  placeholder='Введите пароль' />
          {this.props.serverDataError ? <small> Вы ввели неверный логин или пароль </small>  : null}
          {this.props.serverConnectError ? <small> Сервер недоступен </small> : null}
        </div>
        <input onClick={this.onHandleLogin} className='btn login-btn ' value='Войти' type='submit' />
      </form>
    );
  }
}

function mapStateToProps(state: IAppState): IStateProps {
  return {
    serverConnectError: state.commonReducer.serverConnectError,
    serverDataError: state.commonReducer.serverDataError,
    authState: state.commonReducer.authState,
    role_type: state.commonReducer.role_type,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    authActions: new AuthActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export {connectApp as LoginForm};
