import * as React from 'react';
import { TestItem } from './testItem';

interface IStateProps {
  testList: [object];
  onActiveTest: any;
}

export class TestList extends React.PureComponent<IStateProps> {
  public render() {
    return(
      <div className='testList collection col s8 push-s4'>
        {this.props.testList.map((el: any) => {
          return <TestItem testItem={el} onActiveTest={this.props.onActiveTest} />;
        })}
      </div>
    );
  }
}
