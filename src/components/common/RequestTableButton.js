import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';

const RequestTableButton = ({status, onClick}) => {
  return (
    <Button
      block
      bsStyle="primary"
      bsSize="sm"
      className="outline"
      onClick={onClick}>View Request</Button>
  );
};

RequestTableButton.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RequestTableButton;
