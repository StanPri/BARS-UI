import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import React, {PropTypes} from 'react';

/**
 * Bootstrapped input field for selects to pass to Redux Form's <Field/>
 * @param {object} field
 */
const FieldSelect = field => (
  <FormGroup controlId={field.input.name}>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl componentClass="select" multiple={field.multiple} {...field.input}>
      {field.multiple || <option value="">Select {field.label}</option>}
      {field.options.map(v => <option key={v} value={v}>{v}</option>)}
    </FormControl>
    {field.error && <HelpBlock>{field.error}</HelpBlock>}
  </FormGroup>
);

export default FieldSelect;
