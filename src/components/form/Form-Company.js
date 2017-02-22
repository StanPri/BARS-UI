// libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Row, Col} from 'react-bootstrap';
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
const FormCompany = ({fieldsDisabled, allDisabled, singleLine}) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <div>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Company Name"
          name={KEYS.FORM_COMPANY}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_COMPANY]}
          component={RenderField}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Company Address"
          name={KEYS.FORM_COMPANY_ADDRESS}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_COMPANY_ADDRESS]}
          component={RenderField}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Divison"
          name={KEYS.FORM_DIVISION}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_DIVISION]}
          component={RenderField}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Unit / Project"
          name={KEYS.FORM_UNIT}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_UNIT]}
          component={RenderField}
          type="text"
          required={!allDisabled}/>
      </Col>
    </div>
  );
};

FormCompany.propTypes = {
  fieldsDisabled: PropTypes.object,
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool
}

export default FormCompany;
