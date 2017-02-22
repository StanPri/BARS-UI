/**
 * Last Page of wiazrd if not justifications -> Access Requirements
 * Displays when new request
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: change validation for fields
 * TODO: on click a jsutification neeeded add to jsutifications, set justificationsNeeded
 */
// libraries
import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row} from 'react-bootstrap';
// components
import FormHeader from '../../components/form/Form-Header';
import FormAccess from '../../components/form/Form-Access';
import FormButtons from '../../components/form/Form-Buttons';
// actions, constants, etc
import validate from './validate';
import * as KEYS from '../../store/keyMap';

/**
 * Fourth page of wizard - Access Requirements
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * @param {func}  handleSubmit      - handles sending submit to redux-form
 * @param {func}  onSubmit          - handles going to next page or submitting
 * @param {bool}  submitButton      - determines if text of submit button
 * @param {func}  previousPage      - handles moving back to previous page in wizard
 * @return JSX
 */
let WizardAccess = ({handleSubmit, onSubmit, submitButton, previousPage, accessHandleChange}) => {
  let _submitButton = submitButton
    ? "Submit"
    : "Next";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={accessHandleChange}>
      <FormHeader header="Access Requirements" centered/>
      <FormAccess/>
      <Row className="text-center">
        <p>Fields marked with an asterisk (*) require a justification.</p>
      </Row>
      <FormButtons
        onSubmitText={_submitButton}
        onClick={previousPage}
        onClickText={"Previous"}/>
    </form>
  );
};

WizardAccess.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButton: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired
}

// connect to redux form
WizardAccess = reduxForm({form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate})(WizardAccess);

export default WizardAccess;
