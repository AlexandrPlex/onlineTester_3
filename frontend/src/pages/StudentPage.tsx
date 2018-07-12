import * as React from 'react';

export class StudentPage extends React.Component {
  public render() {
    return <div className='container'>
      {this.props.children}
    </div>;
  }
}
