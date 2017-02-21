// libraries
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormCompany from '../../components/form/Form-Company';
import FormButtons from '../../components/form/Form-Buttons';
// actions, constants, etc
import validate from './validate';
import * as KEYS from '../../store/keyMap';

/**
 * Second page of wizard - Recipients Company Information
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * @param {func}    handleSubmit    - handles moving to next page in form
 * @param {func}    previousPage    - handles moving back to previous page in wizard
 * @param {object}  fieldsDisabled  - object of all fields that should be disabled
 */
let WizardCompany = ({ handleSubmit, previousPage, fieldsDisabled }) => (
  <form onSubmit={handleSubmit}>
    <FormHeader header="Company Information" centered/>
    <FormCompany fieldsDisabled={fieldsDisabled}/>
    <FormButtons
      onSubmitText={"Next"}
      onClick={previousPage}
      onClickText={"Previous"}/>
  </form>
);

WizardCompany.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
};

// connect to redux form
WizardCompany = reduxForm({ form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate })( WizardCompany );

export default WizardCompany;
