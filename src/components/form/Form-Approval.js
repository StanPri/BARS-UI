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
