// imported libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Col} from 'react-bootstrap';
// common compnents
import FieldInput from '../common/FieldInput';
import NameList from '../common/NameList';
import * as KEYS from '../../store/keyMap';

/**
 * Renders approver information section of form
 * @param {object}  fieldsDisabled         - determines which fields should be disabled
 * @param {bool}    allDisabled            - determines if all fields should be disabled
 * @param {bool}    singleLine             - determines if fields should render in a single line
 */
const FormMainApprover = ({
  fieldsDisabled,
  allDisabled,
  singleLine,
  isEscalated
}) => {
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
          label="Supervisor Name"
          name={isEscalated ? KEYS.FORM_MANAGER_NAME : KEYS.FORM_SUP_NAME}
          disabled={allDisabled}
          component={FieldInput}
          type="text"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Supervisor Email"
          name={isEscalated ? KEYS.FORM_MANAGER_EMAIL : KEYS.FORM_SUP_EMAIL}
          disabled={allDisabled}
          component={FieldInput}
          type="email"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Supervisor Phone"
          name={isEscalated ? KEYS.FORM_MANAGER_PHONE : KEYS.FORM_SUP_PHONE}
          disabled={allDisabled}
          component={FieldInput}
          type="cel"
          required={!allDisabled}/>
      </Col>
    </div>
  );
};

FormMainApprover.propTypes = {
  fieldsDisabled: PropTypes.object,
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool,
  isEscalated: PropTypes.func
}

export default FormMainApprover;
