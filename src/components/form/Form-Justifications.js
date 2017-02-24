// libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays justifications section of form
 * @param {bool}    allDisabled     - toggles disabling all fields
 * @param {bool}    singleLine      - toggles al fields being in a single line
 * @param {array}   justifications  - contains names of all justifications needed
 */
const FormJustifications = ({ allDisabled, singleLine, justifications }) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      {justifications.map(key => (
        <Col sm={width} smOffset={offset} key={key.name}>
          <Field
            label={key.name}
            name={`${KEYS.JUSTIFICATIONS}[${key.justification}]`}
            disabled={allDisabled}
            component={FieldInput}
            componentClass="textarea"
            required={!allDisabled}/>
        </Col>
      ))}
    </Row>
  );
};

FormJustifications.propTypes = {
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool,
  justifications: PropTypes.array.isRequired
};

export default FormJustifications;
