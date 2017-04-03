/**
 * FieldRadioGroup.js
 * renders a redux-form radio group
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import {FormGroup, ControlLabel, HelpBlock, Label} from 'react-bootstrap';

const ApproverRadioGroup = ({
  label,
  required,
  name,
  options,
  input,
  disabled,
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
      {options.map((option, index) => (
        <div className="radio" key={index}>
          <label>
            <input
              type="radio"
              name={name}
              value={index}
              checked={input.value.toString().indexOf(index) !== -1}
              onChange={input.onChange}
              disabled={disabled}/> {`${option}`}
          </label>
        </div>
      ))
}
      {invalidState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default ApproverRadioGroup;
