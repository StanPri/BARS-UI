// libraries
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormRecipient from '../../components/form/Form-Recipient';
import WizardButtons from '../../components/wizard/Wizard-Buttons';
// actions, constants, etc
import validate from '../form/validate';

/**
 * First Page of wiazrd - Recipient Information
 * Displays list of recipeint when name entered in name field
 * Auto populates based off name from list selected
 * @param {func}    handleSubmit            - handles sending submit to redux-form
 * @param {func}    onSubmit                - handles going to next page
 * @param {func}    recipientHandleInput    - populates list of recipients
 * @param {func}    recipientHandleClick    - handles clicking on name from list
 * @param {object}  recipientNames          - names to populate list with
 * @param {bool}    recipientNamesHidden    - toggles if list is visible
 * @param {object}  fieldsDisabled          - determines which fields are disabled
 * @return JSX
 */
let WizardRecipient = ({
  handleSubmit,
  onSubmit,
  recipientHandleInput,
  recipientHandleClick,
  recipientNames,
  recipientNamesHidden,
  fieldsDisabled
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormHeader header="Recipient Information" centered/>
    <FormRecipient
      recipientHandleInput={recipientHandleInput}
      recipientHandleClick={recipientHandleClick}
      recipientNames={recipientNames}
      recipientNamesHidden={recipientNamesHidden}
      fieldsDisabled={fieldsDisabled}/>
    <WizardButtons onSubmitText="Next"/>
  </form>
);

WizardRecipient.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  recipientHandleInput: PropTypes.func.isRequired,
  recipientHandleClick: PropTypes.func.isRequired,
  recipientNames: PropTypes.object.isRequired,
  recipientNamesHidden: PropTypes.bool.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
};

// connect to redux form
WizardRecipient = reduxForm({form: 'wizard', destroyOnUnmount: false, forceUnregisterOnUnmount: true, touchOnBlur: false, validate})(WizardRecipient);

export default WizardRecipient;
