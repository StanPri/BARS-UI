/**
 * renderField.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const RadioGroup = ({
    label,
    required,
    name,
    options,
    input,
    meta: {touched, error}
}) =>{
  const validState = touched && error ? "error" : null;
  return (
    <FormGroup controlId={name} validationState={validState}>
      <ControlLabel>{label} { required && <span className="required-text">(required)</span> }</ControlLabel>
        { options.map((option, index) => (
          <div className="radio" key={index}>
            <label>
              <input
                type="radio"
                name={name}
                value={index}
                checked={input.value.indexOf(index) !== -1}
                onChange={input.onChange} />
              {`${option.name} ${option.justification ? "*" : ""}`}
            </label>
          </div>))
        }
      {validState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default RadioGroup;
