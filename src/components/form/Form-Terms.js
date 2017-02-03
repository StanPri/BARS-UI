// display text based off auth.name == form.manager or == form.name
// display name
// require enter name same as shown in feild
//  // lowercase both

import React, {PropTypes} from 'react';
import FormInput from '../common/FormInput';
import * as KEYS from '../../store/keyMap';

/**
 * Displays terms and conditions text and input field
 * Required/shown if user is the recipient or manager
 */
const FormTerms = () => (
  <Field
    component={FormInput}
    name="TODO: name of role type"
    label="Company Address"/>
);

FormTerms.propTypes = {};

export default FormTerms;
