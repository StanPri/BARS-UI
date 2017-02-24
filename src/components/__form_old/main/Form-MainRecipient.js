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
// components
import FieldInput from '../../common/FieldInput';
import NameList from '../../common/NameList';
// constants, actions, etc
import * as KEYS from '../../../store/keyMap';

/**
 * Renders recipient section of form
 * @param {func}    recipientHandleInput   - handles entering a name into name field
 * @param {func}    recipientHandleClick   - handles clicking on a name from list
 * @param {object}  recipientNames         - list of names to display
 * @param {bool}    recipientNamesHidden   - toggles showing the list of names
 * @param {object}  fieldsDisabled         - determines which fields should be disabled
 * @param {bool}    allDisabled            - determines if all fields should be disabled
 * @param {bool}    singleLine             - determines if fields should render in a single line
 */
const FormMainRecipient = ({
  recipientHandleInput,
  recipientHandleClick,
  recipientNames,
  recipientNamesHidden,
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
          label="Name"
          name={KEYS.FORM_NAME}
          disabled={allDisabled}
          component={FieldInput}
          type="text"
          onInput={recipientHandleInput}
          required={!allDisabled}/> {!allDisabled && <NameList
          hidden={recipientNamesHidden}
          list={recipientNames}
          onClick={recipientHandleClick}/>}
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Email"
          name={KEYS.FORM_EMAIL}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_EMAIL]}
          component={FieldInput}
          type="email"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Phone"
          name={KEYS.FORM_PHONE}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_PHONE]}
          component={FieldInput}
          type="cel"
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Cell"
          name={KEYS.FORM_CELL}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_CELL]}
          component={FieldInput}
          type="cel"/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="License Plate"
          name={KEYS.FORM_LICENSE}
          disabled={allDisabled || fieldsDisabled[KEYS.FORM_LICENSE]}
          component={FieldInput}
          type="cel"
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormMainRecipient.propTypes = {
  recipientHandleInput: PropTypes.func,
  recipientHandleClick: PropTypes.func,
  recipientNames: PropTypes.object,
  recipientNamesHidden: PropTypes.bool,
  fieldsDisabled: PropTypes.bool,
  allDisabled: PropTypes.func,
  singleLine: PropTypes.func
}

export default FormMainRecipient;
