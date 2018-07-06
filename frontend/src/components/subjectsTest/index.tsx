import * as React from 'react';

interface IStateProps {
  testList?: [object];
}

export class SubjectsTest extends React.PureComponent<IStateProps> {
  public render() {
    return(
      <ul className='collection col s3'>
        <li className='collection-item'>Alvin</li>
        <li className='collection-item'>Alvin</li>
        <li className='collection-item'>Alvin</li>
        <li className='collection-item'>Alvin</li>
      </ul>
    );
  }
}
