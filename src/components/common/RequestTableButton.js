import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';

const RequestTableButton = ({onClick, text, style}) => {
  return (
    <Button
      block
      bsStyle={style ? style : "primary"}
      bsSize="sm"
      className="outline"
      onClick={onClick}>{text}</Button>
  );
};

RequestTableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string
};

export default RequestTableButton;
