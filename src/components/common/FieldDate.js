/**
 * FieldDate.js
 * renders a redux-form date field using react-datepicker
 * see https://github.com/Hacker0x01/react-datepicker/issues/543
 */
import React from 'react';
import moment from 'moment';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Label} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Tooltip from '../common/Tooltip';
import 'react-datepicker/dist/react-datepicker.css';

const FieldInput = ({
  componentClass,
  required,
  disabled,
  onInput,
  input,
  label,
  type,
  tooltipVisible,
  meta: {
    touched,
    error
  }
}) => {
  const invalidState = touched && error
    ? "error"
    : null;

  return (
    <FormGroup controlId={name} validationState={invalidState}>
      <ControlLabel>
        <Tooltip
          text={label}
          required={required}
          tooltipName={input.name}
          tooltipVisible={tooltipVisible}/>
      </ControlLabel>
      <DatePicker
        {...input}
        className="form-control"
        todayButton="Today"
        placeholderText={disabled ? '' : `Enter ${label}`}
        disabled={disabled}
        dateFormat="YYYY-MM-DD"
        selected={input.value
        ? moment(input.value)
        : null}
        autoComplete="off"/> {invalidState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default FieldInput;
