/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormRecipient from '../../components/form/Form-Recipient';
import FormCompany from '../../components/form/Form-Company';
import FormApprover from '../../components/form/Form-Approver';
import FormAccess from '../../components/form/Form-Access';
// import FormJustifications from
// '../../components/form/Form-Justifications'; import
// FormSecurity from '../../components/form/Form-Security';
import FormButtons from '../../components/form/Form-Buttons';
// actions, constants, etc
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import validate from '../wizard/validate';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

class FormPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  // errorredirect() {
  //
  // }

  render() {
    const {handleSubmit, requestForm} = this.props;
    // data[KEYS.FORM_SAM_SUPER] === auth[KEYS.USER_SAM] => supervisor
    // data[KEYS.FORM_SAM_RECEIVE] === auth[KEYS.USER_SAM] => recipient
    switch (requestForm[KEYS.FORM_STATUS]) {
      case KEYS.STATUS_PEND_MGR:
      case KEYS.STATUS_PEND_REC:
      case KEYS.STATUS_PEND_SEC:
      case KEYS.STATUS_APPROVED:
      case KEYS.STATUS_CANCEL_SUB:
      case KEYS.STATUS_CANCEL_MGR:
      case KEYS.STATUS_CANCEL_REC:
      case KEYS.STATUS_CANCEL_SEC:
      case KEYS.STATUS_ERROR:
      default:
        // return <DisplayError
        //   onClick={}/>;
    }
    // Unknown/Error State
      // display error instead
    // Waiting Manager Approval State
      // Main -> disabled
      // Access -> editable
      // Justifications -> editable
      // Terms Manager -> editable, terms displayed
      // Buttons -> approve/reject
    // Waiting Recipient Approval State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Terms Manager -> disabled, terms hidden
      // Terms Recipient -> edtiable, terms displayed
      // Buttons -> approve/reject
    // Waiting Security Approval State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Terms Manager -> disabled, terms hidden
      // Terms Recipient -> edtiable, terms hidden
      // Security -> editable
      // Buttons -> approve/reject
    // Approved State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Terms Manager -> disabled, terms hidden
      // Terms Recipient -> edtiable, terms hidden
      // Security -> disabled
    // Cancel Submitter State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Reject -> disabled
    // Cancel Manager State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Reject -> disabled
    // Cancel Reipicent State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Terms Manager -> disabled, terms hidden
      // Reject -> disabled
    // Cancel Security State
      // Main -> disabled
      // Access -> disabled
      // Justifications -> disabled
      // Terms Manager -> disabled, terms hidden
      // Terms Recipient -> disabled, terms hidden
      // Reject -> disabled

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader header="Recipient Information"/>
        <div className="row">
          <FormRecipient allDisabled singleLine/>
          <FormCompany allDisabled singleLine/>
          <FormApprover allDisabled singleLine/>
        </div>
        <FormHeader header="Access Requirements"/>
        <FormAccess allDisabled singleLine/>
        {/* <FormHeader header="Justifications"/>
        <FormJustifications allDisabled singleLine  /> */}
        {/* <FormHeader header="Security"/>
        <FormSecurity allDisabled />*/}
        <FormButtons onClickText="Reject" onSubmitText="Accept"/>
      </form>
    );
  }
}


const onSubmit = (vals) => {
  // submit goes here
  console.log(vals);
};

FormPage.propTypes = {};

// map all state (from redux store) to props
const mapStateToProps = (state, ownProps) => ({
  fetchCallsInProgress: state.fetchCallsInProgress,
  requestForm: state.requestForm,
  initialValues: state.requestForm
});

// map all action creators to props
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...requestFormActions}, dispatch)});

// connect to redux form
FormPage = reduxForm({
  form: 'form',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(FormPage);

// connect to redux using state and dispatch
FormPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);

export default FormPage;
