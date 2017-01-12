import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const FormJustifications = props => (
  <div>
    <Row>
      <Col xs={12}>
        <h2>
          Justifications
          <Button><Glyphicon glyph="question-sign"/></Button>
        </h2>
      </Col>
      <Col xs={12}>
        "justifications go here. You got some explainin to do...."
      </Col>
    </Row>
  </div>
);

export default FormJustifications;
