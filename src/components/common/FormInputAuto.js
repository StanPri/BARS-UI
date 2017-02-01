import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import React, {PropTypes} from 'react';

/**
 * Bootstrapped input field for non-selects to pass to Redux Form's <Field/>
 * generates list of items to select from, which will populate input field.
 * @param {object} field
 */
const FieldInputAuto = field => (
  <FormGroup controlId={field.input.name}>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl
      {...field.input}
      autoComplete="off"
      onInput={field.onInput}
      placeholder={`Enter ${field.label}`}
      type={field.type}/> {field.error && <HelpBlock>{field.error}</HelpBlock>}
    {/* TODO:
        -> styling --> overflow scroll, fixed box that dosnt push others
        -> handle clicking on entry to populate field
    */}
    <ul>
      {field.data.map(x => <li key={x[field.dataField]}>{x[field.dataField]}</li>)}
    </ul>
  </FormGroup>
);

export default FieldInputAuto;
