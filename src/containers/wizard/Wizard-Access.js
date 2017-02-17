/**
 * Last Page of wiazrd if not justifications -> Access Requirements
 * Displays when new request
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: change validation for fields
 * TODO: change to components
 * TODO: on click a jsutification neeeded add to jsutifications, set justificationsNeeded
 */
// imported libraries
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// actions, constants, etc
import validate from './validate';
import * as KEYS from '../../store/keyMap';
// import renderField from '../../components/common/renderField';


//TODO: MOVE TO COMMON COMPONENT
// https://github.com/erikras/redux-form/issues/1037
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const CheckboxGroup = ({ label, required, name, options,  input, meta: {touched, error}}) => {
  const validState = touched && error ? "error" : null;
  return (
    <FormGroup controlId={name} validationState={validState} required>
      <ControlLabel>{label} { required && <span className="required-text">(required)</span> }</ControlLabel>
        { options.map((option, index) => (
          <div className="checkbox" key={index}>
            <label>
              <input
                type="checkbox"
                name={`${name}[${index}]`}
                checked={input.value.indexOf(index) !== -1}
                onChange={event => {
                 const newValue = [...input.value];
                 if(event.target.checked) {
                   newValue.push(index);
                 } else {
                   newValue.splice(newValue.indexOf(index), 1);
                 }
                 return input.onChange(newValue);
                }}/>
              {`${option.name} ${option.justification ? "*" : ""}`}
            </label>
          </div>))
        }
      {validState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

//TODO: MOVE TO COMMON COMPONENT
// https://github.com/erikras/redux-form/issues/1037
// http://redux-form.com/6.5.0/examples/wizard/

const radioGroup = ({ label, required, name, options,  input, meta: {touched, error}}) =>{
  const validState = touched && error ? "error" : null;
  return (
    <FormGroup controlId={name} validationState={validState}>
      <ControlLabel>{label} { required && <span className="required-text">(required)</span> }</ControlLabel>
        { options.map((option, index) => (
          <div className="radio" key={index}>
            <label>
              <input
                type="radio"
                name={name}
                value={index}
                checked={input.value.indexOf(index) !== -1}
                onChange={input.onChange}/>
              {`${option.name} ${option.justification ? "*" : ""}`}
            </label>
          </div>))
        }
      {validState && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

const areaOptions = [
  { name: "Office" },
  { name: "Gold Camp" },
  { name: "Gold Camp - Dock", justification: 1 },
  { name: "Gold Camp - Computer Room (Raised Floor)" },
  { name: "Gold Camp - Tenant Managed Space (TMS-p)", justification: 1 },
  { name: "Prospect Green" },
  { name: "Croydon Warehouse" },
  { name: "Extended Current Access" },
  { name: "Training Center (24/7)", justification: 1 },
  { name: "Other Area", justification: 1 }
];

const reasonOptions = [
  { name: "New Employee", },
  { name: "Student / Intern" },
  { name: "Vendor / Contractork" },
  { name: "Badge Replacement" },
  { name: "Change Access", justification: 1 }
];

const hoursOptions = [
  { name: "Weekdays (6am - 7pm)" },
  { name: "24 hours / Day", justification: 1 }
];

let WizardAccess = ({
 handleSubmit,
 submitButton,
 previousPage
}) => {
  let _submitButton = submitButton ? "Submit" : "Next";
  return (
   <form onSubmit={handleSubmit}>
     <h2>Access Requirements</h2>
     <div className="row">
       <div className="col-xs-12 col-sm-4">
         <Field
           label="Reason"
           name={KEYS.FORM_REASON}
           options={reasonOptions}
           component={radioGroup}
           required />
      </div>
       <div className="col-xs-12 col-sm-4">
         <Field
           label="Areas"
           name={KEYS.FORM_AREAS}
           options={areaOptions}
           component={CheckboxGroup}
           required />
       </div>
       <div className="col-xs-12 col-sm-4">
         <Field
           label="Hours"
           name={KEYS.FORM_HOURS}
           options={hoursOptions}
           component={radioGroup}
           required />
       </div>
     </div>
     <div className="row text-center">
       <p>Fields marked with an asterisk (*) require a justification.</p>
     </div>
     <div className="row text-center">
       <div className="btn-group">
         <button type="button" className="previous btn btn-default" onClick={previousPage}>Previous</button>
         <button type="submit" className="next btn btn-primary">{_submitButton}</button>
       </div>
     </div>
   </form>
  );
};

WizardAccess.propTypes = {
 handleSubmit: PropTypes.func.isRequired,
 submitButton: PropTypes.bool.isRequired,
 previousPage: PropTypes.func.isRequired
}

// connect to redux form
WizardAccess = reduxForm({
 form: 'wizard',                   // <------ same form name
 destroyOnUnmount: false,          // <------ preserve form data
 forceUnregisterOnUnmount: true,   // <------ unregister fields on unmount
 validate
})(WizardAccess);

export default WizardAccess;
