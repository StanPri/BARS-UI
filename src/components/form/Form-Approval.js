import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../common/FormInput';

FormApproval.propTypes = {};

function FormApproval() {
  return (
    <div>
      <h2>Terms and Conditions</h2>
      <p>Terms blah blah blah... By Entering your name as it appears below and clicking 'Agree' you agree...</p>
      <Field component={FormInput} name="terms_name" label="Name"/>
      <button>Disagree</button>
      <button>Agree</button>
    </div>
  );
}

export default FormApproval;
