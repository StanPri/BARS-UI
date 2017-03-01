// libraries
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {Row} from 'react-bootstrap';
// components
import FormHeader from '../../components/form/Form-Header';
import FormJustifications from '../../components/form/Form-Justifications';
import WizardButtons from '../../components/wizard/Wizard-Buttons';
// actions, constants, etc
import validate from '../form/validate';
import * as KEYS from '../../store/keyMap';

/**
 * Second page of wizard - Recipients Company Information
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * @param {func}    handleSubmit        - handles sending submit to redux-form
 * @param {func}    onSubmit            - handles going to next page or submitting
 * @param {func}    previousPage        - handles moving back to previous page in wizard
 * @param {object}  fieldsDisabled      - object of all fields that should be disabled
 * @return JSX
 */
let WizardJustifications = ({handleSubmit, onSubmit, previousPage, justifications, submitButton}) => {
  let _submitButton = submitButton
    ? "Submit"
    : "Next";
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader header="Justifications" centered/>
      <Row className="text-center">
        <p>Please enter justifications for the following Access Requirements:</p>
      </Row>
      <FormJustifications justifications={justifications}/>
      <WizardButtons
        onSubmitText={_submitButton}
        onClick={previousPage}
        onClickText={"Previous"}/>
    </form>
  );
};

WizardJustifications.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitButton: PropTypes.bool.isRequired,
  justifications: PropTypes.array.isRequired
};

// connect to redux form
WizardJustifications = reduxForm({form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate})(WizardJustifications);

export default WizardJustifications;
