// libraries
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormTermsApprover from '../../components/form/Form-TermsApprover';
import WizardButtons from '../../components/wizard/Wizard-Buttons';
// actions, constants, etc
import validate from '../form/validate';
import * as KEYS from '../../store/keyMap';

/**
 * Last optional page of wizard - Terms and Conditions for approvers if submitter is approver
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * @param {func}    handleSubmit      - handles sending submit to redux-form
 * @param {func}    onSubmit          - handles submitting form
 * @param {func}    previousPage      - handles moving back to previous page in wizard
 * @param {string}  approverName      - name user must enter to complete terms and conditions
 * @return JSX
 */
let WizardTerms = ({handleSubmit, onSubmit, previousPage, approverName}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormHeader header="Terms and Conditions" centered/>
    <FormTermsApprover label={approverName} name={KEYS.FORM_TERMS_NAME_SUP}/>
    <WizardButtons
      onSubmitText={"Submit"}
      onClick={previousPage}
      onClickText={"Previous"}/>
  </form>
);

WizardTerms.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  approverName: PropTypes.string.isRequired
};

// connect to redux form
WizardTerms = reduxForm({form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate})(WizardTerms);

export default WizardTerms;
