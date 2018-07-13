import * as React from 'react';

interface IAnswerState {
  answer?: any;
}

export class AnswerForm extends React.PureComponent<IAnswerState> {
  public render() {
    return(
      <form action='#'>
        <h5>Кто из президентов США написал свой собственный рассказ про Шерлока Холмса?</h5>
        <p>
          <label>
            <input name='group1' type='radio' className='radio_button' />
            <span>Джон Кеннеди</span>
          </label>
        </p>
        <p>
          <label>
            <input name='group1' type='radio' />
            <span>Франклин Рузвельт</span>
          </label>
        </p>
        <p>
          <label>
            <input name='group1' type='radio' />
            <span>Рональд Рейган</span>
          </label>
        </p>
        <button className='btn'> Далее </button>
      </form>
    );
  }
}
