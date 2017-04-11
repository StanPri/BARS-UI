import React, {PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import FormRecipient from './Form-Recipient';
import FormCompany from './Form-Company';
import FormApprover from './Form-Approver';

/**
 * Displays main section of form
 * Visible and disabled for all users and all states
 * @param {bool} isEsacalted    - determines if manager approval escalted
 */
const FormMain = ({isEscalated}) => (
  <Row>
    <FormRecipient allDisabled singleLine/>
    <FormCompany allDisabled singleLine/>
    <FormApprover isEscalated={isEscalated} allDisabled singleLine/>
  </Row>
);

FormMain.propTypes = {
  isEscalated: PropTypes.bool
}

export default FormMain;
