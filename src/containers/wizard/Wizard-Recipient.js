/**
 * First Page of wiazrd -> Recipient
 * Requires user to enter name, select one from list, then auto populates fields
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: change validation for fields
 * TODO: change to components
 */
// imported libraries
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// actions, constants, etc
import validate from './validate';
import * as KEYS from '../../store/keyMap';
import renderField from '../../components/common/renderField';

let WizardRecipient = ({
  handleSubmit,
  recipientHandleInput,
  recipientHandleClick,
  recipientNames,
  recipientNamesHidden,
  fieldsDisabled
}) => {
  let hidden = recipientNamesHidden ? 'hidden' : '';
  return (
    <form onSubmit={handleSubmit}>
      <h2>Recipient Information</h2>
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Name"
            name={KEYS.FORM_NAME}
            component={renderField}
            type="text"
            onInput={recipientHandleInput}
            required />
          <ul className={`form_field_auto_list ${hidden}`}>
            {/* display full name and email for each employee */}
            {recipientNames.allIds.map(x => <li key={x}>
              <a onClick={recipientHandleClick} data-id={x}>{`${recipientNames.byId[x][KEYS.USER_NAME]} <${recipientNames.byId[x][KEYS.USER_EMAIL]}>`}</a>
            </li>)}
          </ul>
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Email"
            name={KEYS.FORM_EMAIL}
            disabled={fieldsDisabled[KEYS.FORM_EMAIL]}
            component={renderField}
            type="email"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Phone"
            name={KEYS.FORM_PHONE}
            disabled={fieldsDisabled[KEYS.FORM_PHONE]}
            component={renderField}
            type="cel"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Cell"
            name={KEYS.FORM_CELL}
            disabled={fieldsDisabled[KEYS.FORM_CELL]}
            component={renderField}
            type="cel" />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="License Plate"
            name={KEYS.FORM_LICENSE}
            disabled={fieldsDisabled[KEYS.FORM_LICENSE]}
            component={renderField}
            type="cel"
            required />
        </div>
      </div>
      <div className="row text-center">
        <div className="btn-group">
          <button type="submit" className="next btn btn-primary">Next</button>
        </div>
      </div>
    </form>
  );
};

WizardRecipient.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  recipientHandleInput: PropTypes.func.isRequired,
  recipientHandleClick: PropTypes.func.isRequired,
  recipientNames: PropTypes.object.isRequired,
  recipientNamesHidden: PropTypes.bool.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
}

// connect to redux form
WizardRecipient = reduxForm({
  form: 'wizard',                   // <------ same form name
  destroyOnUnmount: false,          // <------ preserve form data
  forceUnregisterOnUnmount: true,   // <------ unregister fields on unmount
  validate
})(WizardRecipient);

export default WizardRecipient;
