// libraries
import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormApprover from '../../components/form/Form-Approver';
import WizardButtons from '../../components/wizard/Wizard-Buttons';
// actions, constants, etc
import validate from './validate';

/**
 * Third page of wizard - Approver Information
 * Displays list of approvers when name entered in supervisor name field
 * Auto populated if manager already selected
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * @param {func}    handleSubmit            - handles sending submit to redux-form
 * @param {func}    onSubmit                - handles going to next page
 * @param {func}    approverHandleInput     - populates list of approvers
 * @param {func}    approverHandleClick     - handles clicking on name from list
 * @param {object}  approverNames           - names to populate list with
 * @param {bool}    approverNamesHidden     - toggles if list if visible
 * @param {bool}    previousPage            - handles going to previous page of wizard
 * @param {object}  fieldsDisabled          - determines which fields are disabled
 * @return JSX
 */
let WizardApprover = ({
  handleSubmit,
  onSubmit,
  approverHandleInput,
  approverHandleClick,
  approverNames,
  approverNamesHidden,
  previousPage,
  fieldsDisabled
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormHeader header="Supervisor Information" centered/>
    <FormApprover
      approverHandleInput={approverHandleInput}
      approverHandleClick={approverHandleClick}
      approverNames={approverNames}
      approverNamesHidden={approverNamesHidden}
      fieldsDisabled={fieldsDisabled}/>
    <WizardButtons
      onSubmitText={"Next"}
      onClick={previousPage}
      onClickText={"Previous"}/>
  </form>
);

WizardApprover.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  approverHandleInput: PropTypes.func.isRequired,
  approverHandleClick: PropTypes.func.isRequired,
  approverNames: PropTypes.object.isRequired,
  approverNamesHidden: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
}

// connect to redux form
WizardApprover = reduxForm({form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, touchOnBlur: false, validate})(WizardApprover);

export default WizardApprover;
