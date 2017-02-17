/**
 * First Page of wiazrd -> Recipient
 * Requires user to enter name, select one from list, then auto populates fields
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: change validation for fields
 * TODO: change to components
 * TODO: on click an apporer name, check if approver is user, set apporer if so
 */
// imported libraries
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// actions, constants, etc
import validate from './validate';
import renderField from '../../components/common/renderField';
import * as KEYS from '../../store/keyMap';

let WizardApprover = ({
  handleSubmit,
  approverHandleInput,
  approverHandleClick,
  approverNames,
  approverNamesHidden,
  previousPage,
  fieldsDisabled
}) => {
  let hidden = approverNamesHidden ? 'hidden' : '';
  return (
    <form onSubmit={handleSubmit}>
      <h2>Supervisor Information</h2>
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Supervisor Name"
            name={KEYS.FORM_SUP_NAME}
            disabled={fieldsDisabled[KEYS.FORM_SUP_NAME]}
            component={renderField}
            type="text"
            onInput={approverHandleInput}
            required />
          <ul className={`form_field_auto_list ${hidden}`}>
            {/* display full name and email for each employee */}
            {approverNames.allIds.map(x => <li key={x}>
              <a onClick={approverHandleClick} data-id={x}>{`${approverNames.byId[x][KEYS.USER_NAME]} <${approverNames.byId[x][KEYS.USER_EMAIL]}>`}</a>
            </li>)}
          </ul>
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Supervisor Email"
            name={KEYS.FORM_SUP_EMAIL}
            disabled={fieldsDisabled[KEYS.FORM_SUP_EMAIL]}
            component={renderField}
            type="email"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Supervisor Phone"
            name={KEYS.FORM_SUP_PHONE}
            disabled={fieldsDisabled[KEYS.FORM_SUP_PHONE]}
            component={renderField}
            type="cel"
            required />
        </div>
      </div>
      <div className="row text-center">
        <div className="btn-group">
          <button type="button" className="previous btn btn-default" onClick={previousPage}>Previous</button>
          <button type="submit" className="next btn btn-primary">Next</button>
        </div>
      </div>
    </form>
  );
};

WizardApprover.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  approverHandleInput: PropTypes.func.isRequired,
  approverHandleClick: PropTypes.func.isRequired,
  approverNames: PropTypes.object.isRequired,
  approverNamesHidden: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
}

// connect to redux form
WizardApprover = reduxForm({
  form: 'wizard',                   // <------ same form name
  destroyOnUnmount: false,          // <------ preserve form data
  forceUnregisterOnUnmount: true,   // <------ unregister fields on unmount
  validate
})(WizardApprover);

export default WizardApprover;
