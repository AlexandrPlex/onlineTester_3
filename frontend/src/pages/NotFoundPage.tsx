import * as React from 'react';

import { Header } from '../components/Header';

export class NotFoundPage extends React.PureComponent {
  public render() {
    return (
      <div>
        <Header/>
        <h1>Page 404</h1>
        <img className='re-zero' src={require('../images/rezero.png')} alt='re-zero' />
        <img className='re-zero' src={require('../images/rezero.png')} alt='re-zero' />
      </div>
    );
  }
}
