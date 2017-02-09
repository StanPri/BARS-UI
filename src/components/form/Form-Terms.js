// display text based off auth.name == form.manager or == form.name display name
// require enter name same as shown in feild  // lowercase both

import React, {PropTypes} from 'react';
import FormInput from '../common/FormInput';
import {Field} from 'redux-form';
import * as KEYS from '../../store/keyMap';

const text = {
  [KEYS.ROLE_RECIPIENT]: `Terms and agreement for USERS`,
  [KEYS.ROLE_MANAGER]: `Terms and agreement for MANAGERS`
};

const names = {
  [KEYS.ROLE_RECIPIENT]: KEYS.FORM_TERMS,
  [KEYS.ROLE_MANAGER]: KEYS.FORM_TERMS_SUP
}

/**
 * Displays terms and conditions text and input field
 * Terms based off users role
 * Required/shown if user is the recipient or manager
 */
const FormTerms = ({role, name, disabled}) => (
  <div>
    <h2>
      Terms and Conditions
    </h2>
    <p>{text[role]}</p>
    <Field component={FormInput} name={names[role]} label={name} disabled={disabled}/>
  </div>
);

FormTerms.propTypes = {
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default FormTerms;
