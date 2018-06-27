import * as React from 'react';

import { LoginForm } from './LoginForm';

export class LoginFormLayout extends React.Component {
  public render() {
    return (
      <div className='login-app center-align z-depth-2'>
        <span className='login-title'>Login</span>
        <LoginForm />
      </div>
    );
  }
}
