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
 * @param {bool}   changeReasons  - contains changeReasons needed
 */
const FormChangeReasons = ({ allDisabled }) => {
  return (
    <Row>
      <Col sm={12}>
          <Field
            label="Access Requirements Change Reason"
            name={`${KEYS.CHANGE_REASONS}`}
            disabled={allDisabled}
            component={FieldInput}
            componentClass="textarea"
            required={!allDisabled}/>
        </Col>
    </Row>
  );
};

FormChangeReasons.propTypes = {
  allDisabled: PropTypes.bool
};

export default FormChangeReasons;
