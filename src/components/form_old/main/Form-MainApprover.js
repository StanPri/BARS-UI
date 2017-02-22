// imported libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Label
} from 'react-bootstrap';
// common compnents
import RenderField from '../../common/RenderField';
import NameList from '../../common/NameList';
import * as KEYS from '../../../store/keyMap';

/**
 * Renders approver information section of form
 * @param {func}    approverHandleInput    - handles entering a name into name field
 * @param {func}    approverHandleClick    - handles clicking on a name from list
 * @param {object}  approverNames          - list of names to display
 * @param {bool}    approverNamesHidden    - toggles showing the list of names
 * @param {object}  fieldsDisabled         - determines which fields should be disabled
 * @param {bool}    allDisabled            - determines if all fields should be disabled
 * @param {bool}    singleLine             - determines if fields should render in a single line
 */
const FormMainApprover = ({
  approverHandleInput,
  approverHandleClick,
  approverNames,
  approverNamesHidden,
  fieldsDisabled,
  allDisabled,
  singleLine
}) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <Row>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Supervisor Name"
          name={KEYS.FORM_SUP_NAME}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_SUP_NAME]}
          component={RenderField}
          type="text"
          onInput={approverHandleInput}
          required={!allDisabled}/> {!allDisabled && <NameList
          hidden={approverNamesHidden}
          list={approverNames}
          onClick={approverHandleClick}/>}
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Supervisor Email"
          name={KEYS.FORM_SUP_EMAIL}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_SUP_EMAIL]}
          component={RenderField}
          type="email"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Supervisor Phone"
          name={KEYS.FORM_SUP_PHONE}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_SUP_PHONE]}
          component={RenderField}
          type="cel"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormMainApprover.propTypes = {
  approverHandleInput: PropTypes.func,
  approverHandleClick: PropTypes.func,
  approverNames: PropTypes.object,
  approverNamesHidden: PropTypes.bool,
  fieldsDisabled: PropTypes.bool,
  allDisabled: PropTypes.func,
  singleLine: PropTypes.func
}

export default FormMainApprover;
