import * as React from 'react';

interface IAnswerCollecionState {
    answerList?: any;
}

export class AnswerCollection extends React.PureComponent<IAnswerCollecionState> {
    public render() {
        return (<ul className='pagination'>
            <li className='active'><a href='#!'>1</a></li>
            <li className='waves-effect'><a href='#!'>2</a></li>
            <li className='active'><a href='#!'>3</a></li>
            <li className='waves-effect'><a href='#!'>4</a></li>
            <li className='waves-effect'><a href='#!'>5</a></li>
        </ul>);
    }
}
