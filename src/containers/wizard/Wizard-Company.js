/**
 * Second Page of wiazrd -> Company
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

let WizardCompany = ({
  handleSubmit,
  previousPage,
  fieldsDisabled
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Recipient Company</h2>
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Company Name"
            name={KEYS.FORM_COMPANY}
            disabled={fieldsDisabled[KEYS.FORM_COMPANY]}
            component={renderField}
            type="text"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Company Address"
            name={KEYS.FORM_COMPANY_ADDRESS}
            disabled={fieldsDisabled[KEYS.FORM_COMPANY_ADDRESS]}
            component={renderField}
            type="text"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Divison"
            name={KEYS.FORM_DIVISION}
            disabled={fieldsDisabled[KEYS.FORM_DIVISION]}
            component={renderField}
            type="text"
            required />
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <Field
            label="Unit / Project"
            name={KEYS.FORM_UNIT}
            disabled={fieldsDisabled[KEYS.FORM_UNIT]}
            component={renderField}
            type="text"
            required />
        </div>
      </div>
      <div className="row text-center">
        <div className="btn-group">
          <button type="button" className="previous  btn btn-default" onClick={previousPage}>Previous</button>
          <button type="submit" className="next btn btn-primary">Next</button>
        </div>
      </div>
    </form>
  );
};

WizardCompany.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  fieldsDisabled: PropTypes.object.isRequired
}

// connect to redux form
WizardCompany = reduxForm({
  form: 'wizard',                   // <------ same form name
  destroyOnUnmount: false,          // <------ preserve form data
  forceUnregisterOnUnmount: true,   // <------ unregister fields on unmount
  validate
})(WizardCompany);

export default WizardCompany;
