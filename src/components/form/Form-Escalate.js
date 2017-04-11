// libraries
import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

/**
 * Displays confirmation text for escalating to next manager
 * @param {string} name   - name to display
 */
const FormEscalate = ({name}) => {
  return (
    <Row>
      <Col sm={12} smOffset={0} className="text-center add-padding">
        <h4>The next level approver for this request is <b>{name}</b>. Are you sure you want to escalate this request?</h4>
      </Col>
    </Row>
  );
}

FormEscalate.propTypes = {
  name: PropTypes.string,
};

export default FormEscalate;
