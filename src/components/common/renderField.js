/**
 * renderField.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const RenderField = ({ required, disabled, onInput, input, label, type, meta: {touched, error}}) => {
 const validState = touched && error ? "error" : null;
 return (
   <FormGroup controlId={name} validationState={validState}>
     <ControlLabel>{label} { required && <span className="required-text">(required)</span> }</ControlLabel>
       <input
         {...input}
         onInput={onInput}
         placeholder={`Enter ${label}`}
         type={type}
         disabled={disabled}
         className="form-control"
         autoComplete="off"/>
     {validState && <HelpBlock>{error}</HelpBlock>}
   </FormGroup>
 );
};

export default RenderField;
