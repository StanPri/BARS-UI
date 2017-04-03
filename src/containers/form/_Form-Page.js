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
import FormChangeReasons from '../../components/form/Form-ChangeReasons'
import FormTermsApprover from '../../components/form/Form-TermsApprover';
import FormTermsRecipient from '../../components/form/Form-TermsRecipient';
import FormSecurity from '../../components/form/Form-Security';
import FormReject from '../../components/form/Form-Reject';
import FormButtons from '../../components/form/Form-Buttons';
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
// actions, constants, etc
import validate from './validate';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

class FormPage extends Component {
  constructor(props, context) {
    super(props, context);
    const {initialValues} = this.props;
    this.state = {
      justifications: initialValues[KEYS.JUSTIFICATIONS] || [], // justification component expects array of names
      justificationsUpdate: true,  // handles updating jsutificatinos after state has been set (componentDidUpdate)
      changeReasons: false,  // changeReasons component expects array of names
      changeReasonsUpdate: true,  // handles updating changeReasons after state has been set (componentDidUpdate)
      accessDisplayOtherArea: initialValues[KEYS.FORM_AREA_OTHER] ? true : false,        // handles is other area selected, display field to enter other area
      isRejecting: false  // determines if user has clicked the "Reject"
    };
    this.errorOnClick = this.errorOnClick.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
    // bind api functions
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSubmitRejectPatch = this.handleSubmitRejectPatch.bind(this);
    this.handleSubmitReject = this.handleSubmitReject.bind(this);
    this.handleSubmitApprovalPatch = this.handleSubmitApprovalPatch.bind(this);
    this.handleSubmitApproval = this.handleSubmitApproval.bind(this);
    // bind justifications functions
    this.updateJustifications = this.updateJustifications.bind(this);
    // bind changeReasons functions
    this.updateChangeReasons = this.updateChangeReasons.bind(this);
    this.formHandleChange = this.formHandleChange.bind(this);
  }

  componentDidUpdate() {
    this.updateJustifications();
    this.updateChangeReasons();
  }

  errorOnClick() {
    //TODO: redirect to homepage
    browserHistory.push('/');
    return;
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////     REJECT FUNCTIONS     /////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Toggles displaying the Reject component when "Reject" button clicked
   */
  toggleReject() {
    const {isRejecting} = this.state;
    this.setState({isRejecting : !isRejecting});
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////     API FUNCTIONS     ////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Handles edirecting to homepage once API call completed
   */
  handleRedirect() {
    const {destroy, fetchCallsInProgress} = this.props;
    if(!fetchCallsInProgress) {
      destroy();                      // clear form
      browserHistory.push('/');       // redirect to homepage
    } else {
      setTimeout(this.handleRedirect, 100);
    }
  }
  /**
   * Handles patching a rejection then rejecting a request
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  handleSubmitRejectPatch(vals) {
    const {actions} = this.props;
    actions.patchExisitingRequest(vals, [KEYS.FORM_REJECT_REASON]);
    this.handleSubmitReject(vals);
  }
  /**
   * Handles rejecting a request after patch request completed
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  handleSubmitReject(vals) {
    const {actions, fetchCallsInProgress} = this.props;
    if(!fetchCallsInProgress) {
      actions.cancelExistingRequest(+ vals[KEYS.FORM_ID], vals[KEYS.FORM_REJECT_REASON]);
      this.handleRedirect();
    } else {
      setTimeout(this.handleSubmitReject, 100, vals);
    }
  }
  /**
   * Handles patching approval then submitting an approval
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  handleSubmitApprovalPatch(vals) {
    const {actions} = this.props;
    // setup fields for approvers or security to patch
    let fieldsApprover = [KEYS.JUSTIFICATIONS, KEYS.CHANGE_REASONS, KEYS.FORM_AREAS, KEYS.FORM_REASON, KEYS.FORM_HOURS, KEYS.FORM_AREA_OTHER];
    let fieldsSecurity = [KEYS.JUSTIFICATIONS, KEYS.CHANGE_REASONS, KEYS.FORM_AREAS, KEYS.FORM_REASON, KEYS.FORM_HOURS, KEYS.FORM_AREA_OTHER, KEYS.FORM_SECURITY_NAME, KEYS.FORM_LEVELS, KEYS.FORM_ISSUE, KEYS.FORM_EXPIRE_DATE, KEYS.FORM_KEYCARD];
    // check if in pending approval state and patch approver if so
    if (vals[KEYS.FORM_STATUS] === KEYS.STATUS_PEND_MGR) {
      actions.patchExisitingRequest(vals, fieldsApprover);
    }
    // check if in pending security state and pacth security if so
    if (vals[KEYS.FORM_STATUS] === KEYS.STATUS_PEND_SEC) {
      actions.patchExisitingRequest(vals, fieldsSecurity);
    }
    this.handleSubmitApproval(vals);
  }
  /**
   * Handles submitting approval after patch request completed
   * @param {object} vals   - values passed by redux-form's handleSubmit
   */
  handleSubmitApproval(vals) {
    const {actions, fetchCallsInProgress} = this.props;
    if(!fetchCallsInProgress) {
      actions.submitExistingRequest(vals[KEYS.FORM_ID]); // approve existing request
      this.handleRedirect();
    } else {
      setTimeout(this.handleSubmitting, 100, vals);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     JUSTIFICATIONS FUNCTIONS     /////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * TODO: this is exact same as in waizrd page.. make into common function
   * handles updating justifications needed
   * (checks in componentDidUpdate)
   */
  updateJustifications() {
    const {formValues} = this.props;
    const {justificationsUpdate} = this.state;
    const _justifications = [];
    let otherAreaDisplay = false;
    // if form mounted and justification update needed (need tp keep track for componentDidMount to work)
    if (formValues && justificationsUpdate) {
      // check area sections
      if (formValues[KEYS.FORM_AREAS]) {
        // set justifiction needed if requried field set
        formValues[KEYS.FORM_AREAS].forEach(key => {
          let value = KEYS.OPTIONS_AREA[+key].justification;
          if (KEYS.OPTIONS_AREA[+key].justification) {
            _justifications.push(KEYS.OPTIONS_AREA[key]);
            // check if other area box selecetd, set display if so
            if (value === KEYS.JUSTIFICATIONS_OTHER) {
              otherAreaDisplay = true;
            }
          }
        });
        // set display of other area field
        this.setState({accessDisplayOtherArea: otherAreaDisplay});
      }
      // check reason section
      if (formValues[KEYS.FORM_REASON]) {
        // set justification needed if required reason set
        if (KEYS.OPTIONS_REASON[+formValues[KEYS.FORM_REASON]].justification) {
          _justifications.push(KEYS.OPTIONS_REASON[+formValues[KEYS.FORM_REASON]]);
        }
      }
      // check hours section
      if (formValues[KEYS.FORM_HOURS]) {
        // set justification needed if required hour set
        if (KEYS.OPTIONS_HOURS[+formValues[KEYS.FORM_HOURS]].justification) {
          _justifications.push(KEYS.OPTIONS_HOURS[+formValues[KEYS.FORM_HOURS]]);
        }
      }
      // update state and make componentDidMount not go into endless loop
      this.setState({justificationsUpdate: false});
      this.setState({justifications: _justifications});
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     REASON CHANGES FUNCTIONS     /////////////////////
  //////////////////////////////////////////////////////////////////////////////

  updateChangeReasons() {
    const {formValues, initialValues} = this.props;
    const {changeReasonsUpdate} = this.state;
    let _changeReasons = false;
    // if form mounted and reasonChange update needed (need tp keep track for componentDidMount to work)
    if (formValues && changeReasonsUpdate) {
      // check area sections
      if (formValues[KEYS.FORM_AREAS]) {
        // set changeReason needed if areas not equal to inital areas
        _changeReasons = formValues[KEYS.FORM_AREAS] !== initialValues[KEYS.FORM_AREAS];
      }
      // check reason section
      if (formValues[KEYS.FORM_REASON] && !_changeReasons) {
        // set changeReason needed if reasons not equal to inital reasons
        _changeReasons = formValues[KEYS.FORM_REASON] !== initialValues[KEYS.FORM_REASON];
      }
      // check hours section
      if (formValues[KEYS.FORM_HOURS] && !_changeReasons) {
        // set changeReason needed if hours not equal to inital hours
        _changeReasons = formValues[KEYS.FORM_HOURS] !== initialValues[KEYS.FORM_HOURS];
      }
      // update state and make componentDidMount not go into endless loop
      this.setState({changeReasonsUpdate: false});
      this.setState({changeReasons: _changeReasons});
    }
  }

  /**
   * Handles form changing
   */
  formHandleChange(e) {
    // update justifications and changeReasons in componentDidUpdate
    this.setState({justificationsUpdate: true});
    this.setState({changeReasonsUpdate: true});
  }

  render() {
    const {handleSubmit, initialValues, auth} = this.props;
    const {isRejecting, justifications, accessDisplayOtherArea, changeReasons} = this.state;

    // init roles for users in form, based off user's role and if found in form fields
    const isApprover = initialValues[KEYS.FORM_SAM_SUPER] === auth[KEYS.USER_SAM];
    const isRecipient = initialValues[KEYS.FORM_SAM_RECEIVE] === auth[KEYS.USER_SAM];
    const isSecurity = auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY);

    // init properties for sections of form that will change
    // contains if should be displayed and props to pass
    let propsAccess         = {display: false, props: {}};
    let propsJustifications = {display: false, props: {}};
    let propsChangeReasons = {display: false, props: {}};
    let propsTermsApprover  = {display: false, props: {}};
    let propsTermsRecipient = {display: false, props: {}};
    let propsSecurity       = {display: false, props: {}};
    let propsReject         = {display: false, props: {}};
    let propsButtons        = {display: false, props: {}};

    // buttons for approving or rejecting properties
    let buttonApproving = {rightColor: "danger", rightText: "Reject", rightClick: this.toggleReject, leftText: "Accept", leftClick: handleSubmit(this.handleSubmitApprovalPatch)};
    let buttonRejecting = {rightColor: "danger", rightText: "Cancel", rightClick: this.toggleReject, leftText: "Confirm", leftClick: handleSubmit(this.handleSubmitRejectPatch)};

    let justificationsNeeded = !!justifications.length;
    let changeReasonsNeeded = !!changeReasons.length;

    // check status of form, and display / disable based off that and users role in form
    switch (initialValues[KEYS.FORM_STATUS]) {
      case KEYS.STATUS_PEND_MGR:
        propsAccess         = {display: true, props: {allDisabled: !isApprover}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: !isApprover, justifications}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: !isApprover, changeReasons}};
        propsReject         = {display: isRejecting, props:{}};
        propsTermsApprover  = {display: isApprover && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsButtons        = {display: isApprover, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}}
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: isRecipient && !isRejecting, props: {name: KEYS.FORM_TERMS_NAME_REC, label: initialValues[KEYS.FORM_NAME]}};
        propsButtons        = {display: isRecipient, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_PEND_SEC:
        propsAccess         = {display: true, props: {allDisabled: !isSecurity}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: !isSecurity, justifications}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: !isSecurity, changeReasons}};
        propsReject         = {display: isRejecting, props: {}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsSecurity       = {display: isSecurity && !isRejecting, props: {}};
        propsButtons        = {display: isSecurity, props: isRejecting ? buttonRejecting : buttonApproving};
        break;
      case KEYS.STATUS_APPROVED:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsSecurity       = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_SUB:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}};
        propsReject         = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_MGR:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}};
        propsReject         = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_REC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsReject         = {display: true, props: {allDisabled: true}};
        break;
      case KEYS.STATUS_CANCEL_SEC:
        propsAccess         = {display: true, props: {allDisabled: true}};
        propsJustifications = {display: justificationsNeeded, props: {allDisabled: true}};
        propsChangeReasons  = {display: changeReasonsNeeded, props: {allDisabled: true}};
        propsTermsApprover  = {display: true, props: {allDisabled: true, name: KEYS.FORM_SUP_NAME, label: initialValues[KEYS.FORM_SUP_NAME]}};
        propsTermsRecipient = {display: true, props: {allDisabled: true, name: KEYS.FORM_NAME, label: initialValues[KEYS.FORM_NAME]}};
        propsReject         = {display: true, props: {allDisabled: true}};
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
          <FormAccess {...propsAccess.props} displayOtherArea={accessDisplayOtherArea} singleLine/>
        </div>}
        {propsJustifications.display && <div>
          <FormHeader header="Justifications"/>
          <FormJustifications {...propsJustifications.props} justifications={justifications} singleLine/>
        </div>}
        {propsChangeReasons.display && <div>
          <FormHeader header="Change Reason"/>
          <FormChangeReasons {...propsChangeReasons.props} changeReasons={changeReasons} singleLine/>
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
FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true, validate})(FormPage);

// connect to redux using state and dispatch
FormPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);

export default FormPage;
