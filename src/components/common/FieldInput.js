/**
 * FieldInput.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Label} from 'react-bootstrap';

const FieldInput = ({
  componentClass,
  required,
  disabled,
  onInput,
  input,
  label,
  type,
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
      <ControlLabel>{label} {required && <span className="required-text">(required)</span>}</ControlLabel>
      <FormControl
        {...input}
        onInput={onInput}
        placeholder={disabled ? '' : `Enter ${label}`}
        type={type}
        disabled={disabled}
        autoComplete="off"
        componentClass={componentClass}/> {invalidState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default FieldInput;
