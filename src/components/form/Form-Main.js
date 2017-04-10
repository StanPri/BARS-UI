import React from 'react';
import {Row} from 'react-bootstrap';
import FormRecipient from './Form-Recipient';
import FormCompany from './Form-Company';
import FormApprover from './Form-Approver';

/**
 * Displays main section of form
 * Visible and disabled for all users and all states
 * @param {bool} isEsacalted    - determines if manager approval escalted
 */
const FormMain = ({isEscalted}) => (
  <Row>
    <FormRecipient allDisabled singleLine/>
    <FormCompany allDisabled singleLine/>
    <FormApprover isEscalted={isEscalted} allDisabled singleLine/>
  </Row>
);

export default FormMain;
