// libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Row, Col, Button} from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
import DatePicker from '../common/FieldDate';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays approval of terms and conditions for supervisors in form
 * @param {string}  label           - name user must match to confirm
 * @param {string}  name            - field name
 * @param {bool}    allDisabled     - toggles disabling all fields
 * @param {bool}    singleLine      - toggles al fields being in a single line
 */
const FormTermsApprover = ({label, name, allDisabled}) => {
  let widthSm = allDisabled
    ? 6
    : 12;
  let widthMd = allDisabled
    ? 9
    : 12;
  return (
    <div>
      <Row>
        <Col sm={12}>
          {!allDisabled && <div>
            <p>By entering your name exactly as it appears below you
              agree to the following terms and conditions:</p>
            <ul>
              <li>approvers terms and condiitions....</li>
              <li>more terms and condiitions....</li>
            </ul>
          </div>}
        </Col>
      </Row>
      <Row>
        <Col sm={widthSm} md={widthMd}>
          <Field
            label={label}
            name={name}
            disabled={allDisabled}
            component={FieldInput}
            type="text"
            required={!allDisabled}/>
        </Col>
        {allDisabled && <Col sm={6} md={3}>
          <Field
            label="Approval Date"
            name={KEYS.FORM_APPROVAL_DATE_SUP}
            disabled={allDisabled}
            component={DatePicker}/>
        </Col>}
      </Row>
    </div>
  );
};

FormTermsApprover.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  allDisabled: PropTypes.bool
}

export default FormTermsApprover;
