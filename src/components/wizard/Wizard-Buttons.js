// imported libraries
import React, { PropTypes } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

/**
 * Buttons for wizard form pages
 * @param {string}  onSubmitText    - text to display for submit button
 * @param {func}    onClick         - handles button that is not submit button
 * @param {string}  onClickText     - text to display for button that is not submit button
 */
const WizardButtons = ({ onSubmitText, onClick, onClickText }) => {
  return (
    <Row>
      <Col xs={12} className="text-center">
        <ButtonGroup>
          {onClickText && <Button onClick={onClick}>{onClickText}</Button>}
          <Button type="submit" bsStyle="primary">{onSubmitText}</Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

WizardButtons.propTypes = {
  onSubmitText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClickText: PropTypes.string
};

export default WizardButtons;
