import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

const FormRejectConfirm = ({onReject, onCancel}) => (
  <ButtonGroup>
    <Button onClick={onReject} bsStyle="primary">Confirm</Button>
    <Button onClick={onCancel} bsStyle="danger">Cancel</Button>
  </ButtonGroup>
);

FormRejectConfirm.propTypes = {
  onReject: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FormRejectConfirm;
