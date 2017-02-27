/**
 * FieldInput.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const FieldCheckGroup = ({
    label,
    required,
    name,
    options,
    input,
    disabled,
    meta: {touched, error}
}) => {
  const validState = touched && error ? "error" : null;
  return (
    <FormGroup controlId={name} validationState={validState} required>
      <ControlLabel>{label} { required && <span className="required-text">(required)</span> }</ControlLabel>
        { options.map((option, index) => (
          <div className="checkbox" key={index}>
            <label>
              <input
                type="checkbox"
                name={`${name}[${index}]`}
                checked={input.value.indexOf(index) !== -1}
                onChange={event => {
                 const newValue = [...input.value];
                 if(event.target.checked) {
                   newValue.push(index);
                 } else {
                   newValue.splice(newValue.indexOf(index), 1);
                 }
                 return input.onChange(newValue);
                }}
                disabled={disabled} />
              {`${option.name} ${option.justification ? "*" : ""}`}
            </label>
          </div>))
        }
      {validState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default FieldCheckGroup;