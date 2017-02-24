// libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Row, Col} from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays approval of terms and conditions for supervisors in form
 * @param {string}  label           - name user must match to confirm
 * @param {string}  name            - field name
 * @param {bool}    allDisabled     - toggles disabling all fields
 * @param {bool}    singleLine      - toggles al fields being in a single line
 */
const FormTermsApprover = ({label, name, allDisabled, singleLine}) => {
  let width = singleLine
    ? 12
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      <Col sm={width} smOffset={offset}>
        {!allDisabled && <div>
          <p>By entering your name exactly as it appears below you
            agree to the following terms and conditions:</p>
          <ul>
            <li>approvers terms and condiitions....</li>
            <li>more terms and condiitions....</li>
          </ul>
        </div>}
        <Field
          label={label}
          name={name}
          disabled={allDisabled}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormTermsApprover.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  allDisabled: PropTypes.bool
}

export default FormTermsApprover;
