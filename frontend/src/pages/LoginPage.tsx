import * as React from 'react';

import { Header } from '../components/Header';

import { LoginFormLayout } from '../components/LoginFormLayout';

export class LoginPage extends React.PureComponent {
  public render() {
    return <div>
      <Header />
      <LoginFormLayout />
    </div>;
  }
}
