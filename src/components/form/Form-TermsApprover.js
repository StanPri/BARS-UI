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
const FormTermsApprover = ({ label, name, allDisabled }) => {
  return (
    <Row>
      <Col sm={6} smOffset={3}>
        {!allDisabled && <div>
          <p>By entering your name exactly as it appears below you agree to the following
            terms and conditions:</p>
          <ul>
            <li>approvers terms and condiitions....</li>
            <li>more terms and condiitions....</li>
          </ul>
        </div>}
        <Field
          label={label}
          name={name}
          disabled={allDisabled}
          component={RenderField}
          type="text"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormTermsApprover.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  allDisabled: PropTypes.bool
}

export default FormTermsApprover;
