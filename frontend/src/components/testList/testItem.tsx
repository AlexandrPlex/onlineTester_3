import * as React from 'react';

interface IStateProps {
    testItem: {test: string, status: boolean, score: number, subhects: string}; // Object
}

export class TestItem extends React.PureComponent<IStateProps> {
    public render() {
        return(
            <div className='collection-item row'>
                <h5> { this.props.testItem.test } </h5>
                <div>{ this.props.testItem.subhects }</div>
                <div className='secondary-content'><button className='waves-effect waves-light btn'>Пройти тест</button></div>
            </div>
        );
    }
}
