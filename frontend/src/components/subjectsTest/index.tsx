import * as React from 'react';

interface IStateProps {
  onFilter: any;
  subjects: [string];
}

export class SubjectsTest extends React.PureComponent<IStateProps> {
  public render() {
    return(
      <ul className='collection col s3 subjectBloc'>
        <li className='collection-item' onClick={this.props.onFilter.bind(this, 'all')}> <a href='#all'> Все </a> </li>
        { this.props.subjects.map( (el: any) => {
          return <li className='collection-item' onClick={this.props.onFilter.bind(this, el)}><a href='#sub' >{el}</a></li>;
        }) }
      </ul>
    );
  }
}
