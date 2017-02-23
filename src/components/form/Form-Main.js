import React from 'react';
import {Row} from 'react-bootstrap';
import FormRecipient from './Form-Recipient';
import FormCompany from './Form-Company';
import FormApprover from './Form-Approver';

/**
 * Displays main section of form
 * Visible and disabled for all users and all states
 */
const FormMain = () => (
  <Row>
    <FormRecipient allDisabled singleLine/>
    <FormCompany allDisabled singleLine/>
    <FormApprover allDisabled singleLine/>
  </Row>
);

export default FormMain;
