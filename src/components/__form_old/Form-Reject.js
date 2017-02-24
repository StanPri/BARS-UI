// TODO:
// modal -> css, how to open/close
// capture reason
// cancel/confirm buttons -> what actions/ reducers


// display text based off auth.name == form.manager or == form.name display name
// require enter name same as shown in feild  // lowercase both

import React, {PropTypes} from 'react';
import {Col} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import {Field} from 'redux-form';
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
const FormReject = ({name, disabled}) => {
  return (
    <div>
      {/* display who and when rejected if past request */}
      {disabled && <h2>Rejected by {name} on "date"</h2>}
      {/* show confirmation text if not past request*/}
      {!disabled && <p>Please enter your reason for rejecting this request below, followed by hitting the "Confirm" button.</p>}
      {/* get reason for cancelation, required */}
      <Col xs={12}>
        <Field
          component={FormInput}
          name={KEYS.FORM_REJECT_REASON}
          label="Rejection Reason"
          componentClass="textarea"
          disabled={disabled}/>
      </Col>
    </div>
  );
}

FormReject.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FormReject;
