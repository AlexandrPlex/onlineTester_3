import * as React from 'react';

interface IStateProps {
    testItem: {id: number, test: string, adddata: any, compldata: any, status: boolean, score: number, subjects: string}; // Object
    onActiveTest: any;
}

export class TestItem extends React.PureComponent<IStateProps> {
    public render() {
        return(
            <div className='collection-item'>
              <div className='row' key={ this.props.testItem.id }>
                {
                  this.props.testItem.status ?
                    <div className='disabled'>
                      <div className='col s3'> {this.props.testItem.test} </div>
                      <div className='col s3'> Завершон </div>
                      <div className='col s3'> {new Date(this.props.testItem.compldata).toDateString()} </div>
                      <div className='col s3'> {this.props.testItem.score} Балов </div>
                    </div>
                    :
                    <div>
                      <div className='col s4'> {this.props.testItem.test} </div>
                      <div className='col s4'> {new Date(this.props.testItem.adddata).toDateString()}</div>
                      <div className='col s4'> <button className='waves-effect waves-light btn right' onClick={this.props.onActiveTest.bind(this, this.props.testItem.id)}> Пройти </button>  </div>
                    </div>
                }
              </div>
            </div>
        );
    }
}
