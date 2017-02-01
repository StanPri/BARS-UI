import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import React, {PropTypes} from 'react';

/**
 * Input field for non-selects to pass to Redux Form's <Field/>
 * Generates list of items to select from, which will populate input field.
 * @param {object} field
 * @return {JSX}
 */
const FieldInputAuto = field => {
  let hidden = field.isHidden ? 'hidden' : '';
  return (
    <FormGroup controlId={field.input.name}>
      <ControlLabel>{field.label}</ControlLabel>
      <FormControl
        {...field.input}
        autoComplete="off"
        onInput={field.onInput}
        placeholder={`Enter ${field.label}`}
        type={field.type}/> {field.error && <HelpBlock>{field.error}</HelpBlock>}
      <ul className={`form_field_auto_list ${hidden}`}>
        {/* display full name and email for each employee */}
        {field.data.allIds.map(x => <li key={`${x}_${field.data.byId[x].fullName}`}>
          <a onClick={field.onNameClick} data-id={x}>{`${field.data.byId[x].fullName} <${x}>`}</a>
        </li>)}
      </ul>
    </FormGroup>
  );
};

export default FieldInputAuto;
