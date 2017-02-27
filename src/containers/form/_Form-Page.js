/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {browserHistory} from 'react-router';
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
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
// actions, constants, etc
import validate from '../wizard/validate';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

class FormPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      justifications: this.props.initialValues[KEYS.JUSTIFICATIONS] || [], // justification component expects array of names
      justificationsUpdate: false,  // handles updating jsutificatinos after state has been set (componentDidUpdate)
      isRejecting: false  // determines if user has clicked the "Reject"
    };
    this.errorOnClick = this.errorOnClick.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
    // bind api functions
    this.submitReject = this.submitReject.bind(this);
    this.submitApproval = this.submitApproval.bind(this);
    // bind justifications functions
    this.updateJustifications = this.updateJustifications.bind(this);
    this.formHandleChange = this.formHandleChange.bind(this);
  }

  componentDidUpdate() {
    this.updateJustifications();
  }

  errorOnClick() {
    //TODO: redirect to homepage
    console.log("REDIRECTING FORM USER CLICKING ERROR BUTTON");
    return;
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////     REJECT FUNCTIONS     /////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  toggleReject() {
    const {isRejecting} = this.state;
    this.setState({isRejecting : !isRejecting});
    return;
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////     API FUNCTIONS     ////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Handles rejecting an approval
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  submitReject(vals) {
    //TODO: handle submitting rejection
    console.log("REJECTING");
    console.log(vals);
    return;
  }

  /**
   * Handles submitting an approval
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  submitApproval(vals) {
    const {actions, mainForm, destroy} = this.props;
    actions.submitExistingRequest(vals[KEYS.FORM_ID]); // approve existing request
    //TODO: handle errors, wait for feetch to complete.
    destroy(); // clear form
    browserHistory.push('/'); // redirect to homepage
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     JUSTIFICATIONS FUNCTIONS     /////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * handles updating justifications needed
   * (checks in componentDidUpdate)
   */
  updateJustifications() {
    const {formValues} = this.props;
    const {justificationsUpdate} = this.state;
    const _justifications = [];
    // if form mounted and justification update needed (need tp keep track for componentDidMount to work)
    if (formValues && justificationsUpdate) {
      // check area sections
      if (formValues[KEYS.FORM_AREAS]) {
        // set justifiction needed if requried field set
        formValues[KEYS.FORM_AREAS].forEach(key => {
          if (KEYS.OPTIONS_AREA[+key].justification) {
            _justifications.push(KEYS.OPTIONS_AREA[key]);
          }
        });
      }
      if (formValues[KEYS.FORM_REASON]) {
        if (KEYS.OPTIONS_REASON[+formValues[KEYS.FORM_REASON]].justification) {
          _justifications.push(KEYS.OPTIONS_REASON[+formValues[KEYS.FORM_REASON]]);
        }
      }
      if (formValues[KEYS.FORM_HOURS]) {
        if (KEYS.OPTIONS_HOURS[+formValues[KEYS.FORM_HOURS]].justification) {
          _justifications.push(KEYS.OPTIONS_HOURS[+formValues[KEYS.FORM_HOURS]]);
        }
      }
      // update state and make componentDidMount not go into endless loop
      this.setState({justificationsUpdate: false});
      this.setState({justifications: _justifications});
    }
  }

  /**
   * Handles form changing
   */
  formHandleChange(e) {
    // update justifications in componentDidUpdate
    this.setState({justificationsUpdate: true});
  }

  render() {
    const {handleSubmit, initialValues, auth} = this.props;
    const {isRejecting, justifications} = this.state;

    // init roles for users in form, based off user's role and if found in form fields
    const isApprover = initialValues[KEYS.FORM_SAM_SUPER] === auth[KEYS.USER_SAM];
    const isRecipient = initialValues[KEYS.FORM_SAM_RECEIVE] === auth[KEYS.USER_SAM];
    const isSecurity = !isRecipient && (auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY));

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
    let buttonApproving = {rightColor: "danger", rightText: "Reject", rightClick: this.toggleReject, leftText: "Accept", leftClick: handleSubmit(this.submitApproval)};
    let buttonRejecting = {rightColor: "danger", rightText: "Cancel", rightClick: this.toggleReject, leftText: "Confirm", leftClick: handleSubmit(this.submitReject)};

    let justificationsNeeded = !!justifications.length;

    // check status of form, and display / disable based off that and users role in form
    switch (initialValues[KEYS.FORM_STATUS]) {
      case KEYS.STATUS_PEND_MGR:
        propsAccess         = {display: true, props: {allDisabled: !isApprover}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: !isApprover, justifications}};
        propsReject         = {display: isRejecting, props:{}};
        propsTermsApprover  = {display: isApprover && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsButtons        = {display: isApprover, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: isRecipient && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_REC, label: initialValues[KEYS.FORM_NAME]}};
        propsButtons        = {display: isRecipient, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_SEC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsSecurity       = {display: isSecurity && !isRejecting, props: {}};
        propsButtons        = {display: isSecurity && !isRecipient, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_APPROVED:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsSecurity       = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_SUB:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsReject         = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_MGR:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsReject         = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsReject         = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME}};
        break;
      case KEYS.STATUS_CANCEL_SEC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true, justifications}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsReject         = {display: true, props: {allDisabled: true, name: "Security"}};
        break;
      default:
        // Unknown/Error State display error
        return <DisplayError onClick={this.errorOnClick}/>;
    }

    return (
      <form onChange={this.formHandleChange}>
        <FormHeader header="Recipient Information"/>
        <FormMain />
        {propsAccess.display && <div>
          <FormHeader header="Access Requirements"/>
          <FormAccess {...propsAccess.props} singleLine/>
        </div>}
        {propsJustifications.display && <div>
          <FormHeader header="Justifications"/>
          <FormJustifications {...propsJustifications.props} singleLine/>
        </div>}
        {propsTermsApprover.display && <div>
          <FormHeader header="Terms and Conditions"/>
          <FormTermsApprover {...propsTermsApprover.props}/>
        </div>}
        {propsTermsRecipient.display &&
          <FormTermsRecipient {...propsTermsRecipient.props}/>}
        {propsSecurity.display && <div>
          <FormHeader header="Security"/>
          <FormSecurity {...propsSecurity.props}/>
        </div>}
        {propsReject.display && <div>
          <FormHeader header="Rejection"/>
          <FormReject {...propsReject.props}/>
        </div>}
        {propsButtons.display &&
          <FormButtons {...propsButtons.props} />}
      </form>
    );
  }
}

FormPage.propTypes = {};

// map all state (from redux store) to props
const mapStateToProps = (state, ownProps) => ({
  fetchCallsInProgress: state.fetchCallsInProgress,
  auth: state.auth,
  formValues: getFormValues('form')(state),          // forms values from redux-form
  initialValues: state.requestForm                  // inital values to populate form with
});

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
