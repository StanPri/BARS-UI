// libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays changeReasons section of form
 * @param {bool}    allDisabled     - toggles disabling all fields
 * @param {bool}    singleLine      - toggles al fields being in a single line
 * @param {array}   changeReasons  - contains names of all changeReasons needed
 */
const FormChangeReasons = ({ allDisabled, singleLine, changeReasons }) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      {changeReasons.map(key => (
        <Col sm={width} smOffset={offset} key={key.name}>
          <Field
            label={key.name}
            name={`${KEYS.CHANGE_REASONS}[${key.changeReason}]`}
            disabled={allDisabled}
            component={FieldInput}
            componentClass="textarea"
            required={!allDisabled}/>
        </Col>
      ))}
    </Row>
  );
};

FormChangeReasons.propTypes = {
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool,
  changeReasons: PropTypes.array.isRequired
};

export default FormChangeReasons;
