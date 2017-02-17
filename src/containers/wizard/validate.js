/**
 * Validations for wiazrd form
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: better vaclidation, cahgne to co0rrect fields etc
 */
import * as KEYS from '../../store/keyMap';

const validate = values => {
  const errors = {};
  // Recipient Information
  // TODO: validate sam to make sure form empDir? how to make sure selcetd from list
  if (!values[KEYS.FORM_NAME]) {
    errors[KEYS.FORM_NAME] = 'Required';
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
  // TODO: validate sam to make sure form empDir? how to make sure selcetd from list
  if (!values[KEYS.FORM_SUP_NAME]) {
    errors[KEYS.FORM_SUP_NAME] = 'Required';
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
  // Sam accounts etc?
  return errors;
}

export default validate;
