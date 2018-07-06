import * as React from 'react';
import { TestItem } from './testItem';

interface IStateProps {
  testList: [object];
}

export class TestList extends React.PureComponent<IStateProps> {
  public render() {
    return(
      <div className='testList collection col s8 push-s1'>
        {this.props.testList.map((el: any) => {
          return <TestItem testItem={el} />;
        })}
      </div>
    );
  }
}
