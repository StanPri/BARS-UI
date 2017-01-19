import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import React, {PropTypes} from 'react';

/**
 * Bootstrapped input field for selects to pass to Redux Form's <Field/>
 * @param {object} field
 */
const FieldSelect = field => (
  <FormGroup controlId={field.input.name}>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl
      {...field.input}
      componentClass="select"
      multiple={field.multiple}
      value={field.input.value}>
      {field.multiple || <option value="">Select {field.label}</option>}
      {field.options.map((v, k) => <option key={`${field.input.name}_${k}`} value={k + 1}>{v}</option>)}
    </FormControl>
    {field.error && <HelpBlock>{field.error}</HelpBlock>}
  </FormGroup>
);

export default FieldSelect;
