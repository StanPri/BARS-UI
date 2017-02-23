// imported libraries
import React, { PropTypes } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

/**
 * Buttons for form pages
 * @param {string}  onSubmitText    - text to display for submit button
 * @param {func}    onClick         - handles button that is not submit button
 * @param {string}  onClickText     - text to display for button that is not submit button
 */
const FormButtons = ({ onSubmitText, onClick, onClickText, onClickColor }) => {
  return (
    <Row>
      <Col xs={12} className="text-center">
        <ButtonGroup>
          {onClickText && <Button bsStyle={onClickColor} onClick={onClick}>{onClickText}</Button>}
          <Button type="submit" bsStyle="primary">{onSubmitText}</Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

FormButtons.propTypes = {
  onSubmitText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClickText: PropTypes.string,
  onClickColor: PropTypes.string,
};

export default FormButtons;
