import * as hash from 'object-hash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IDispatchProps, LoginActions} from '../actions/loginActions';
import { IAppState } from '../types';

interface IStateProps {
  serverConnectError: boolean;
  dataAuthError: boolean;
  loginState: boolean;
  role_type: string;
}

type TProps = IDispatchProps & IStateProps;

class LoginForm extends React.PureComponent<TProps, {loginValue: string, passwordValue: string}> {
  public static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props: any, context: any) {
    super(props, context);

  }
  public onHandleLogin = () => {
    if (Boolean(this.state.loginValue) && Boolean(this.state.passwordValue)) {
      this.props.loginActions.onHandelAuthentication(this.state.loginValue, hash.sha1(this.state.passwordValue))
        .then(() => {
          if (this.props.loginState) {
            console.log('login');
            console.log(this.props.loginState);
            this.context.router.history.push(this.props.role_type);
          }
        });
    }
  }

  public render() {
    return(
      <form className='collection-item waves-effect' onSubmit={(e: any) => { e.preventDefault(); } }>
        <div>
        <input id='email' onChange={(event: any) => {this.setState({loginValue: event.target.value}); } } className={this.props.dataAuthError ? 'input-field invalid'  : 'input-field'} type='email' required placeholder='Введите Email' />
        <input id='password' onChange={(event: any) => {this.setState({passwordValue: event.target.value}); } } className={this.props.dataAuthError ? 'input-field invalid'  : 'input-field'}type='password' required  placeholder='Введите пароль' />
          {this.props.dataAuthError ? <small> Вы ввели неверный логин или пароль </small>  : null}
          {this.props.serverConnectError ? <small> Сервер недоступен </small> : null}
        </div>
        <input onClick={this.onHandleLogin} className='btn login-btn ' value='Войти' type='submit' />
      </form>
    );
  }
}

function mapStateToProps(state: IAppState): IStateProps {
  return {
    serverConnectError: state.loginReducer.serverConnectError,
    dataAuthError: state.loginReducer.dataAuthError,
    loginState: state.loginReducer.loginState,
    role_type: state.loginReducer.role_type,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    loginActions: new LoginActions(dispatch),
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export {connectApp as LoginForm};
