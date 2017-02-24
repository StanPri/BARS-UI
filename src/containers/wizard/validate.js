/**
 * Validations for wiazrd form
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: better vaclidation, cahgne to co0rrect fields etc
 */
import * as KEYS from '../../store/keyMap';

const validate = values => {
  const errors = {};
  // Recipient Information
  if (!values[KEYS.FORM_NAME]) {
    errors[KEYS.FORM_NAME] = 'Required';
  }
  // check if user has changed after selcting a name from list (email should be populated...)
  if (values[KEYS.FORM_EMAIL] && !values[KEYS.FORM_SAM_RECEIVE]) {
    errors[KEYS.FORM_NAME] = 'Enter the recipients name, then select it from the list';
  }
  if (!values[KEYS.FORM_PHONE]) {
    errors[KEYS.FORM_PHONE] = 'Required';
  }
  if (!values[KEYS.FORM_LICENSE]) {
    errors[KEYS.FORM_LICENSE] = 'Required';
  }
  if (!values[KEYS.FORM_EMAIL]) {
    errors[KEYS.FORM_EMAIL] = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[KEYS.FORM_EMAIL])) {
    errors[KEYS.FORM_EMAIL] = 'Invalid email address';
  }
  // Company Information
  if (!values[KEYS.FORM_COMPANY]) {
    errors[KEYS.FORM_COMPANY] = 'Required';
  }
  if (!values[KEYS.FORM_COMPANY_ADDRESS]) {
    errors[KEYS.FORM_COMPANY_ADDRESS] = 'Required';
  }
  if (!values[KEYS.FORM_DIVISION]) {
    errors[KEYS.FORM_DIVISION] = 'Required';
  }
  if (!values[KEYS.FORM_UNIT]) {
    errors[KEYS.FORM_UNIT] = 'Required';
  }
  // Approver Information
  if (!values[KEYS.FORM_SUP_NAME]) {
    errors[KEYS.FORM_SUP_NAME] = 'Required';
  }
  // check if user has changed after selcting a name from list (email should be populated...)
  if (!values[KEYS.FORM_SAM_SUPER]) {
    errors[KEYS.FORM_SUP_NAME] = 'Enter the supervisors name, then select it from the list';
  }
  if (!values[KEYS.FORM_SUP_EMAIL]) {
    errors[KEYS.FORM_SUP_EMAIL] = 'Required';
  }
  if (!values[KEYS.FORM_SUP_PHONE]) {
    errors[KEYS.FORM_SUP_PHONE] = 'Required';
  }
  // Access Requirements
  if (!values[KEYS.FORM_REASON]) {
    errors[KEYS.FORM_REASON] = 'Required';
  }
  if (!values[KEYS.FORM_AREAS] || (values[KEYS.FORM_AREAS] && !values[KEYS.FORM_AREAS].length)) {
    errors[KEYS.FORM_AREAS] = 'Required';
  }
  if (!values[KEYS.FORM_HOURS]) {
    errors[KEYS.FORM_HOURS] = 'Required';
  }
  // Justifications
  if (!values[KEYS.JUSTIFICATIONS_OTHER]) {
    errors[KEYS.JUSTIFICATIONS_OTHER] = 'Required';
  }
  if (!values[KEYS.JUSTIFICATIONS_GC_DOCK]) {
    errors[KEYS.JUSTIFICATIONS_GC_DOCK] = 'Required';
  }
  if (!values[KEYS.JUSTIFICATIONS_GC_TMS]) {
    errors[KEYS.JUSTIFICATIONS_GC_TMS] = 'Required';
  }
  if (!values[KEYS.JUSTIFICATIONS_TRAINING_ROOM]) {
    errors[KEYS.JUSTIFICATIONS_TRAINING_ROOM] = 'Required';
  }
  if (!values[KEYS.JUSTIFICATIONS_CHANGE_ACCESS]) {
    errors[KEYS.JUSTIFICATIONS_CHANGE_ACCESS] = 'Required';
  }
  if (!values[KEYS.JUSTIFICATIONS_24_HOURS]) {
    errors[KEYS.JUSTIFICATIONS_24_HOURS] = 'Required';
  }
  // Terms and Conditions
  if (!values[KEYS.FORM_TERMS_NAME_SUP]) {
    errors[KEYS.FORM_TERMS_NAME_SUP] = 'Required';
  }
  if (values[KEYS.FORM_TERMS_NAME_SUP] !== values[KEYS.FORM_SUP_NAME]) {
    errors[KEYS.FORM_TERMS_NAME_SUP] = 'Please enter your name exactly as it appears above.';
  }

  // return errors;
  return {}; // disable validation
}

export default validate;
