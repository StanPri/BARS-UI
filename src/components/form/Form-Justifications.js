// libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
// compnents
import RenderField from '../common/RenderField';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays company section of form
 * @param {object}  fieldsDisabled  - contains all fields that should be disabled
 * @param {bool}    allDisabled     - toggles disabling all fields
 * @param {bool}    singleLine      - toggles al fields being in a single line
 */
const FormJustifications = ({ allDisabled, singleLine, justifications }) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      {justifications.map(key => (
        <Col sm={width} smOffset={offset} key={key.name}>
          <Field
            label={key.name}
            name={key.justification}
            disabled={allDisabled}
            component={RenderField}
            componentClass="textarea"
            required={!allDisabled}/>
        </Col>
      ))}
    </Row>
  );
};

FormJustifications.propTypes = {
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool
}

export default FormJustifications;
