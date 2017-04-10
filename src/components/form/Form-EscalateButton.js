// imported libraries
import React, {PropTypes} from 'react';
import {Row, Col, Button} from 'react-bootstrap';

/**
 * Buttons for escalating to next manager
 * @param {func}    onEscalateClick     - function to fire when button clicked
 */
const FormEscalateButton = ({
  onEscalateClick
}) => {
  return (
    <Row className="add-padding">
      <Col xs={12} className="text-center">
        <Button bsStyle={"danger"} onClick={onEscalateClick}>Escalate to next manager</Button>
      </Col>
    </Row>
  );
};

FormEscalateButton.propTypes = {
  onEscalateClick: PropTypes.func.isRequired
};

export default FormEscalateButton;
