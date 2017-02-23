/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormMain from '../../components/form/Form-Main';
import FormAccess from '../../components/form/Form-Access';
import FormJustifications from '../../components/form/Form-Justifications';
import FormTermsApprover from '../../components/form/Form-TermsApprover';
import FormTermsRecipient from '../../components/form/Form-TermsRecipient';
import FormSecurity from '../../components/form/Form-Security';
import FormReject from '../../components/form/Form-Reject';
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
    this.errorRedirect = this.errorRedirect.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
    this.submitReject = this.submitReject.bind(this);
    this.submitApproval = this.submitApproval.bind(this);
  }

  errorRedirect() {
    //TODO: redirect to homepage
    return;
  }

  toggleReject() {
    //TODO: toggle rejection component based off state
    return;
  }

  submitReject() {
    //TODO: handle submitting rejection
    return;
  }

  submitApproval() {
    //TODO: handle submitting approval
    return;
  }

  render() {
    const {handleSubmit, requestForm, auth} = this.props;
    const {isRejecting} = this.state;

    // init roles for users in form, based off user's role and if found in form fields
    const isApprover = requestForm[KEYS.FORM_SAM_SUPER] === auth[KEYS.USER_SAM];
    const isRecipient = requestForm[KEYS.FORM_SAM_RECEIVE] === auth[KEYS.USER_SAM];
    const isSecurity = !isRecipient && (auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY);

    // init properties for sections of form that will change
    // contains if should be displayed and props to pass
    let propsAccess         = {display: false, props: {}};
    let propsJustifications = {display: false, props: {}};
    let propsTermsApprover  = {display: false, props: {}};
    let propsTermsRecipient = {display: false, props: {}};
    let propsSecurity       = {display: false, props: {}};
    let propsReject         = {display: false, props: {}};
    let propsButtons        = {display: false, props: {}};

    // buttons for approving or rejecting properties
    let buttonApproving = {rightColor: "danger", rightText: "Reject", rightClick: this.toggleReject, leftText: "Accept", leftClick: this.submitApproval};
    let buttonRejecting = {rightColor: "danger", rightText: "Cancel", rightClick: this.toggleReject, leftText: "Confirm", leftClick: this.submitReject};

    // check status of form, and display / disable based off that and users role in form
    switch (requestForm[KEYS.FORM_STATUS]) {
      case KEYS.STATUS_PEND_MGR:
        propsAccess         = {display: true, props: {allDisabled: !isApprover}};
        propsJustifications = {display: true, props: {allDisabled: !isApprover}};
        propsReject         = {display: isRejecting, props:{}};
        propsTermsApprover  = {display: isApprover && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME]}};
        propsButtons        = {display: isApprover, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME], allDisabled: true}};
        propsTermsRecipient = {display: isRecipient && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_REC, label: requestForm[KEYS.FORM_NAME]}};
        propsButtons        = {display: isRecipient, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_SEC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME], allDisabled: true}};
        propsTermsRecipient = {display: true, props: {name: KEYS.FORM_TERMS_NAME_REC, label: requestForm[KEYS.FORM_NAME], allDisabled: true}};
        propsSecurity       = {display: isSecurity && !isRejecting && !isRecipient, props: {}};
        propsButtons        = {display: isSecurity && !isRecipient, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_APPROVED:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME], allDisabled: true}};
        propsTermsRecipient = {display: true, props: {name: KEYS.FORM_TERMS_NAME_REC, label: requestForm[KEYS.FORM_NAME], allDisabled: true}};
        propsSecurity       = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_SUB:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsReject         = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_MGR:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsReject         = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME], allDisabled: true}};
        propsReject         = {display: true, props: {name: KEYS.FORM_NAME, allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_SEC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: true, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME], allDisabled: true}};
        propsTermsRecipient = {display: true, props: {name: KEYS.FORM_TERMS_NAME_REC, label: requestForm[KEYS.FORM_NAME], allDisabled: true}};
        propsReject         = {display: true, props: {name: "Security", allDisabled: true}};
        break;
      case KEYS.STATUS_ERROR:
      default:
        // Unknown/Error State display error
        return <DisplayError onClick={this.errorRedirect}/>;
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader header="Recipient Information"/>
        <FormMain />
        {propsAccess.display && <div>
          <FormHeader header="Access Requirements"/>
          <FormAccess {...propsAccess.props} singleLine/>
        </div>}
        {/* {propsJustifications.display && <div>
          <FormHeader header="Justifications"/>
          <FormJustifications {...propsJustifications.props} singleLine/>
        </div>} */}
        {propsTermsApprover.display && <div>
          <FormHeader header="Terms and Conditions"/>
          <FormTermsApprover {...propsTermsApprover.props} singleLine/>
        </div>}
        {propsTermsRecipient.display &&
          <FormTermsRecipient {...propsTermsRecipient.props} singleLine/>}
        {propsSecurity.display && <div>
          <FormHeader header="Security"/>
          <FormSescurity {...propsSecurity.props} singleLine/>
        </div>}
        {propsReject.display && <div>
          <FormHeader header="Rejection"/>
          <FormReject {...propsReject.props} singleLine/>
        </div>}
        {propsButtons.display &&
          <FormButtons {...propsButtons.props} />}
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
const mapStateToProps = (state, ownProps) => ({fetchCallsInProgress: state.fetchCallsInProgress, auth: state.auth, requestForm: state.requestForm, initialValues: state.requestForm});

// map all action creators to props
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...requestFormActions
  }, dispatch)
});

// connect to redux form
FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(FormPage);

// connect to redux using state and dispatch
FormPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);

export default FormPage;
