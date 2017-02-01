import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../common/FormInput';

const FormApproval = props => (
  <div>
    <h2>Terms and Conditions</h2>
    <p>Terms blah blah blah... By Entering your name as it appears below and
      clicking 'Agree' you agree...</p>
    <Field component={FormInput} name="terms_name" label="Name"/>
    <button>Disagree</button>
    <button type="submit">Agree</button>
  </div>
);

FormApproval.propTypes = {};

export default FormApproval;

//  AS MANAGER TODO:
//  - terms of approving badge displayed
//  - accept button                                   -> enters/continues workflow, status updated, timestamps created, recipient sent email for confirm approval?
//    - call api with edits
//    - redirect? to home page (lists page)?
//  - decline button
//    - capture reason
//    - call api with reason declined, timestamp.
//    - redirect?
//
//
//  AS RECIPIENT TODO:
//  - terms of recieving badge displayed
//  - accept button                                   -> enters workflow, emails sent, status updated, timestamps created
//    - call api with form data
//    - redirect? to home page (lists page)?
//  - decline button
//    - capture reason                                -> write name in box, sepeerate component?
//    - call api with reason declined, timestamp.     -> how to handle error/ if duplicate request?
//    - redirect?                                     -> how to reset form instead of decline, should this be moved to modal? Seperate component for submitting than approving?
//
//
//  AS SECURITY ADMIN TODO:
//  - accept button                                   -> enters workflow, emails sent, status updated, timestamps created
//    - call api with form data
//    - redirect? to home page (lists page)?          -> prints at this point?
//  - decline button                                  -> how to reset form instead of decline, should this be moved to modal?
//    - capture reason
//    - call api with reason declined, timestamp.
//    - redirect?
