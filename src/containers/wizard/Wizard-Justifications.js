/**
 * Optional Last Page of wiazrd -> Justifications
 * After Access Requirements if Justifications needed
 * Displays when new request
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 * TODO: populate list of justifications from access
 * TODO: change fields
 * TODO: change validation for fields
 * TODO: proptypes
 * TODO: change to components
 * TODO: get compoentns based off which present
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from '../../components/common/renderField';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false

const WizardJustifications = (props) => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <h2>Justifications</h2>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <div>
        <label>Sex</label>
        <div>
          <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
          <Field name="sex" component={renderError}/>
        </div>
      </div>
      <div className="row text-center">
        <div className="btn-group">
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard',  //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(WizardJustifications);
