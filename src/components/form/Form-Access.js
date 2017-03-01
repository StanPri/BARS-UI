// libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Row, Col} from 'react-bootstrap';
// compnents
import FieldRadioGroup from '../common/FieldRadioGroup';
import FieldCheckGroup from '../common/FieldCheckGroup';
import FieldInput from '../common/FieldInput';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays Access Requirements seciton of form
 * @param {bool} allDisabled    - determines if fields are editable
 * @param {bool} otherArea      - determines if other area field should be displayed
 */
const FormAccess = ({allDisabled, displayOtherArea}) => {
  let width = 4;
  let offset = 0;
  return (
    <Row>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Reason"
          name={KEYS.FORM_REASON}
          disabled={allDisabled}
          options={KEYS.OPTIONS_REASON}
          component={FieldRadioGroup}
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Areas"
          name={KEYS.FORM_AREAS}
          disabled={allDisabled}
          options={KEYS.OPTIONS_AREA}
          component={FieldCheckGroup}
          required={!allDisabled}/>
        {displayOtherArea && <Field
          label="Other Area"
          name={KEYS.FORM_AREA_OTHER}
          disabled={allDisabled}
          component={FieldInput}
          required={!allDisabled}/>}
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Hours"
          name={KEYS.FORM_HOURS}
          disabled={allDisabled}
          options={KEYS.OPTIONS_HOURS}
          component={FieldRadioGroup}
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormAccess.propTypes = {
  otherArea: PropTypes.bool,
  onChange: PropTypes.func,
  allDisabled: PropTypes.bool
};

export default FormAccess;
