// imported libraries
import React, {PropTypes} from 'react';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';

/**
 * Buttons for form
 * @param {string}  rightColor    - color of right button. requires bootstrap naming.
 * @param {string}  rightText     - text to display for right button
 * @param {func}    rightClick    - function to fire when right button clicked
 * @param {string}  leftColor     - color of left button. requires bootstrap naming.
 * @param {string}  leftText      - text to display for left button
 * @param {func}    leftClick     - function to fire when left button clicked
 */
const FormButtons = ({
  rightColor,
  rightText,
  rightClick,
  leftColor,
  leftText,
  leftClick
}) => {
  return (
    <Row className="add-padding">
      <Col xs={12} className="text-center">
        <ButtonGroup>\
          <Button
            bsStyle={leftColor || "primary"}
            onClick={leftClick}>{leftText  || "Submit"}</Button>
          {rightClick && <Button
            bsStyle={rightColor || "default"}
            onClick={rightClick}>{rightText}</Button>}
        </ButtonGroup>
      </Col>
    </Row>
  );
};

FormButtons.propTypes = {
  rightColor: PropTypes.string,
  rightText: PropTypes.string,
  rightClick: PropTypes.func,
  leftColor: PropTypes.string,
  leftText: PropTypes.string,
  leftClick: PropTypes.func.isRequired
};

export default FormButtons;
