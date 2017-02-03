import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

const FormApproval = ({onReject}) => (
  <ButtonGroup>
    <Button onClick={onReject} bsStyle="danger">Reject</Button>
    <Button type="submit" bsStyle="primary">Accept</Button>
  </ButtonGroup>
);

FormApproval.propTypes = {
  onReject: PropTypes.func.isRequired
};

export default FormApproval;

//  AS MANAGER TODO:
//  - terms of approving badge displayed
//  - accept button                                   -> enters/continues
// workflow, status updated, timestamps created, recipient sent email for
// confirm approval?
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
//  - accept button                                   -> enters workflow, emails
// sent, status updated, timestamps created
//    - call api with form data
//    - redirect? to home page (lists page)?
//  - decline button
//    - capture reason                                -> write name in box,
// sepeerate component?
//    - call api with reason declined, timestamp.     -> how to handle error/ if
// duplicate request?
//    - redirect?                                     -> how to reset form
// instead of decline, should this be moved to modal? Seperate component for
// submitting than approving?
//
//
//  AS SECURITY ADMIN TODO:
//  - accept button                                   -> enters workflow, emails
// sent, status updated, timestamps created
//    - call api with form data
//    - redirect? to home page (lists page)?          -> prints at this point?
//  - decline button                                  -> how to reset form
// instead of decline, should this be moved to modal?
//    - capture reason
//    - call api with reason declined, timestamp.
//    - redirect?
