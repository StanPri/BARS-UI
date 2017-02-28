// libraries
import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Field} from 'redux-form';
// compnents
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays terms and conditions text and input field
 * Terms based off users role
 * Required if user is the recipient or manager
 * shows for all users
 * @param {string} role   - determine if user is the approver or recipient
 * @param {string} name   - name of field in the form
 * @param {bool} disabeld - makes the field disabled from input
 */
const FormReject = ({allDisabled}) => {
  return (
    <Row>
      {/* show confirmation text if not past request*/}
      {!allDisabled && <p>Please enter your reason for rejecting this request
        below, followed by hitting the "Confirm" button.</p>}
      {/* get reason for cancelation, required */}
      <Col sm={12} smOffset={0}>
        <Field
          label="Rejection Reason"
          name={KEYS.FORM_REJECT_REASON}
          disabled={allDisabled}
          component={FieldInput}
          componentClass="textarea"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
}

FormReject.propTypes = {
  name: PropTypes.string,
  allDisabled: PropTypes.bool
};

export default FormReject;
