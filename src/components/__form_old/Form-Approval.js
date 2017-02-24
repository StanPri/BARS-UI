import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

const FormApproval = ({onReject}) => (
  <ButtonGroup>
    <Button type="submit" bsStyle="primary">Accept</Button>
    <Button onClick={onReject} bsStyle="danger">Reject</Button>
  </ButtonGroup>
);

FormApproval.propTypes = {
  onReject: PropTypes.func.isRequired
};

export default FormApproval;
