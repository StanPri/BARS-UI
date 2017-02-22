// libraries
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
// compnents
import RadioGroup from '../common/RadioGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays Access Requirements seciton of form
 * @param {bool} allDisabled    - determines if fields are editable
 */
const FormAccess = ({ allDisabled }) => {
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
          component={RadioGroup}
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Areas"
          name={KEYS.FORM_AREAS}
          disabled={allDisabled}
          options={KEYS.OPTIONS_AREA}
          component={CheckBoxGroup}
          required={!allDisabled}/>
      </Col>
      <Col sm={width} smOffset={offset}>
        <Field
          label="Hours"
          name={KEYS.FORM_HOURS}
          disabled={allDisabled}
          options={KEYS.OPTIONS_HOURS}
          component={RadioGroup}
          required={!allDisabled}/>
      </Col>
    </Row>
  );
};

FormAccess.propTypes = {
  onChange: PropTypes.func,
  allDisabled: PropTypes.bool
};

export default FormAccess;
