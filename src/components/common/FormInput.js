import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import React, {PropTypes} from 'react';

/**
 * Bootstrapped input field for non-selects to pass to Redux Form's <Field/>
 * @param {object} field
 */
const FieldInput = field => (
  <FormGroup controlId={field.input.name}>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl
      {...field.input}
      placeholder={`Enter ${field.label}`}
      disabled={field.disabled}
      type={field.type}/> {field.error && <HelpBlock>{field.error}</HelpBlock>}
  </FormGroup>
);

export default FieldInput;
