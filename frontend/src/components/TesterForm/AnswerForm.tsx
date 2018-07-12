import * as React from 'react';
import { Input, Row } from 'react-materialize';

export class AnswerForm extends React.PureComponent<{}> {
  public render() {
    return(
      <form name='group1' >
        <h3> Вопрос? </h3>
        <Row>
          <Input name='group1' type='radio' value='red' label='Red' />
          <Input name='group1' type='radio' value='yellow' label='Yellow' />
          <Input name='group1' type='radio' value='green' label='Green' className='with-gap' />
          <Input name='group1' type='radio' value='brown' label='Brown' disabled='disabled' />
        </Row>
      </form>
    );
  }
}
