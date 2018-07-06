import * as React from 'react';

import { StudentForm } from '../components/StudentForm';

export class StudentPage extends React.Component {
  public render() {
    return <div className='container'>
      <StudentForm/>
    </div>;
  }
}
