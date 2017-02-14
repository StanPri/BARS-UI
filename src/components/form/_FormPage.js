/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import {browserHistory} from 'react-router';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change, getFormValues} from 'redux-form';
import FormMain from './Form-Main';
import FormSecurity from './Form-Security';
import FormTerms from './Form-Terms';
import FormApproval from './Form-Approval';
import FormReject from './Form-Reject';
import FormRejectConfirm from './Form-RejectConfirm';
import FormSubmit from './Form-Submit';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

const debug = 1;

/**
 * TODO: field validation
 * Form page for new or exisiting badge requests
 */
class FormPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      justifications: {
        display: true,
        fields: {
          [KEYS.JUSTIFICATIONS_OTHER]: true
        }
      },
      formMainNames: initialState.empDir,
      formMainNamehidden: true,
      formMainSelected: {},
      formApprovalReject: false                        // true if user confirms they want to delete/reject the request
    };
    this.formMainNameHandleInput = this.formMainNameHandleInput.bind(this);
    this.formMainNamesHandleClick = this.formMainNamesHandleClick.bind(this);
    this.formApprovalHandleRejectToggle = this.formApprovalHandleRejectToggle.bind(this);
    this.formApprovalHandleRejectConfirm = this.formApprovalHandleRejectConfirm.bind(this);
    this.formHandleSubmit = this.formHandleSubmit.bind(this);
  }

  componentDidMount() {
    // load employee directory from api for selecting name from list
    this.props.actions.empDir();
  }

  /**
   * Handles submitting requests (submit/approve buttons)
   * @param {object} vals       - values from redux-form
   */
  formHandleSubmit(vals) {
    const {actions, mainForm, destroy} = this.props;
    if (!+ mainForm[KEYS.FORM_STATUS]) { // is new request
      actions.submitNewRequest(vals); // submit/approve new request
    } else {
      actions.submitExistingRequest(vals[KEYS.FORM_ID]); // approve existing request
    }
    destroy(); // clear form
    browserHistory.push('/'); // redirect to homepage
  }

  /**
   * TODO: clear other fields from form if select name then clear field
   * Handles searching for users from employee directory
   * Generates list of employees based off input
   * Shows list if typing, hides list if empty
   * @param {event} e - input event
   */
  formMainNameHandleInput(e) {
    e.preventDefault();
    if (e.target.value.length) {
      let {empDir} = this.props;
      let _search = '(?=.*' + e.target.value.split(/, +|,| +/).join(')(?=.*') + ')';
      let re = new RegExp(_search, 'i');
      let _employees = empDir.allIds.filter(id => {
        if (`${empDir.byId[id].fullName}`.match(re)) {
          return true;
        }
        return false;
      });
      this.setState({
        formMainNames: {
          allIds: _employees,
          byId: empDir.byId
        },
        formMainNamehidden: false
      });
    } else {
      this.setState({formMainNames: initialState.empDir, formMainNamehidden: true});
    }
    if (debug) {
      console.log("FormPage props: ", this.props);
      console.log("FormPage state: ", this.state);
    }
  }

  /**
   * TODO: handle if field is cleared
   * Handles clicking name from list that was generated based off search
   * Populates fields in form based off selection
   * Hides list when clicked, populates state to check if same as user
   * @param {event} e - click event
   */
  formMainNamesHandleClick(e) {
    e.preventDefault();
    const {dispatch, empDir, auth} = this.props;
    const {formMainNames} = this.state;
    let id = e.target.dataset.id; // get employees sam account
    let employee = formMainNames.byId[id]; // look up employee from list of employees
    let submitter = empDir.byId[auth[KEYS.USER_SAM]]; // look up submitter from employee dir based off users sam
    let manager = formMainNames.byId[employee[KEYS.USER_SAM_MANAGER]]; // look up manager based off employees samManager property
    // TODO: consolidate this...
    dispatch(change('form', KEYS.FORM_NAME, employee[KEYS.USER_NAME])); // set recipients name
    dispatch(change('form', KEYS.FORM_SAM_RECEIVE, employee[KEYS.USER_SAM])); // set recipients sam account
    dispatch(change('form', KEYS.FORM_EMAIL, employee[KEYS.USER_EMAIL])); // set recipients email
    dispatch(change('form', KEYS.FORM_PHONE, employee[KEYS.USER_PHONE])); // set recipients phone
    dispatch(change('form', KEYS.FORM_CELL, employee[KEYS.USER_CELL])); // set recipients phone
    dispatch(change('form', KEYS.FORM_SAM_SUPER, manager[KEYS.USER_SAM])); // set managers sam account
    dispatch(change('form', KEYS.FORM_SUP_NAME, manager[KEYS.USER_NAME])); // set managers name
    dispatch(change('form', KEYS.FORM_SUP_EMAIL, manager[KEYS.USER_EMAIL])); // set managers email
    dispatch(change('form', KEYS.FORM_SUP_PHONE, manager[KEYS.USER_PHONE])); // set managers phone
    dispatch(change('form', KEYS.FORM_SUBMIT_EMAIL, "submitter[KEYS.USER_EMAIL]")); // set submitter email
    this.setState({formMainNamehidden: true}); // hide the list of names
  }

  /**
   * Handles displaying the confirmation for deleting/rejecting a request
   * @param {event} e - click event
   */
  formApprovalHandleRejectToggle(e) {
    e.preventDefault();
    this.setState({formApprovalReject: !this.state.formApprovalReject}); // toggle display confirmation / handle confirmation
  }
  /**
   * TODO: handle validating they have filled out reason
   * Handles user confirming that they want to delete/reject a request
   * Requires that they have filled out the rejection text area
   * Redirects to homepage
   * @param {event} e - click event
   */
  formApprovalHandleRejectConfirm(e) {
    e.preventDefault();
    const {actions, mainForm, destroy} = this.props;
    console.log("IN APPROVAL HANDLE REJECT : ", mainForm[KEYS.FORM_REJECT_REASON]);
    actions.deleteExistingRequest(+ mainForm[KEYS.FORM_ID], mainForm[KEYS.FORM_REJECT_REASON]);
    this.setState({formApprovalReject: false});
    destroy(); // clear form
    browserHistory.push('/'); // redirect to homepage
  }


  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      actions,
      auth,
      empDir,
      initialValues,
      mainForm
    } = this.props;
    let employee = this.state.formMainNameSelected; // entry object of employee selected from list
    // user is security role and not recipient
    let isSecurity = mainForm
      ? !getRoleInForm(mainForm, KEYS.FORM_SAM_RECEIVE, auth) && auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY)
      : auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY);
    // get form's status
    let formStatus = mainForm
      ? + mainForm[KEYS.FORM_STATUS]
      : 0;
    // check that user is recipient (in name field of form)
    let isRecipient = getRoleInForm(mainForm, KEYS.FORM_SAM_RECEIVE, auth);
    // check that user is in approving manager (supervisor field on form)
    let isManager = getRoleInForm(mainForm, KEYS.FORM_SAM_SUPER, auth);

    return (
      <form onSubmit={handleSubmit(this.formHandleSubmit)}>
        {/* Main form
          - show for all users
          - disable if not a new request or manager in manager approval state */}
        <FormMain
          formMainNameHandleInput={this.formMainNameHandleInput}
          formMainNamehidden={this.state.formMainNamehidden}
          formMainNames={this.state.formMainNames}
          formMainNamesOnClick={this.formMainNamesHandleClick}
          auth={auth}
          justifications={this.state.justifications}
          disabled={!(!formStatus || (isManager && formStatus === KEYS.STATUS_PEND_MGR))}/>
        {/* Manager terms form
          - show if manager and new form, or
            manager, manager approval state, and not rejecting, or
            higher than manager approval, but not manager reject state
          - disable if not manager in new form or waiting manager approval state */}
        {((isManager && !formStatus) ||
          (isManager && formStatus === KEYS.STATUS_PEND_MGR && !this.state.formApprovalReject) ||
          (formStatus > KEYS.STATUS_PEND_MGR && formStatus !== KEYS.STATUS_CANCEL_MGR)) && <FormTerms
          role={KEYS.ROLE_MANAGER}
          name={mainForm[KEYS.FORM_SUP_NAME]}
          disabled={!(isManager && !formStatus || formStatus === KEYS.STATUS_PEND_MGR)}/>}
        {/* Recipient terms form
          - show if recipient, recipient approval state, and not rejecting or
            security approval state, approved state, or cancel security state
          - disable if not recipient in waiting recipient approval state */}
        {((isRecipient && formStatus === KEYS.STATUS_PEND_REC && !this.state.formApprovalReject) ||
          (formStatus === KEYS.STATUS_PEND_SEC || formStatus === KEYS.STATUS_APPROVED || formStatus === KEYS.STATUS_CANCEL_SEC )) && <FormTerms
          role={KEYS.ROLE_RECIPIENT}
          name={mainForm[KEYS.FORM_NAME]}
          disabled={!(isRecipient && formStatus === KEYS.STATUS_PEND_REC)}/>}
        {/* Security form
          - show if security, security approval state, and not rejecting, or
            approved state
          - disable if not security, or security and in recipient field, or past security approval state */}
        {(isSecurity && formStatus === KEYS.STATUS_PEND_SEC && !this.state.formApprovalReject ||
          formStatus === KEYS.STATUS_APPROVED) && <FormSecurity
          disabled={!isSecurity || (isSecurity && isRecipient) || (formStatus > KEYS.STATUS_PEND_SEC)}/>}
        {/* Rejection form
          - show if user has clicked the reject button from formApproval (formApprovalReject) or
            in any canceled state (anything past aproved)
          - disbale if in a cancelled state  */}
        {(this.state.formApprovalReject || formStatus > KEYS.STATUS_APPROVED) && <FormReject name="NAME__TODO" disabled={formStatus > KEYS.STATUS_APPROVED}/>}
        {/* Rejection form confirmation buttons
          - show if user is confirming to delete/reject the request  */}
        {this.state.formApprovalReject &&
          <FormRejectConfirm
            onCancel={this.formApprovalHandleRejectToggle}
            onReject={this.formApprovalHandleRejectConfirm}/>}
        {/* Submit/Approve buttons
          - show submit buttons if new request
          - show approval buttons if is not confirming rejection, and
              not new request, or
              is manager and in manager approval state, or
              is recipient in recipient approval state, or
              is security who is not recipient and in security approval state
          - disable if approved or higher status */}
        {(!formStatus && <FormSubmit onReset={reset}/>) ||
         !this.state.formApprovalReject &&
         ((isManager && formStatus === KEYS.STATUS_PEND_MGR) ||
          (isRecipient && formStatus === KEYS.STATUS_PEND_REC) ||
          (isSecurity && !isRecipient && formStatus === KEYS.STATUS_PEND_SEC)) &&
        <FormApproval
          onReject={this.formApprovalHandleRejectToggle}/>}
      </form>
    );
  }
}
FormPage.propTypes = {
  empDir: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

/**
 * Checks if users sam matches given field in form
 * ex, if in manager field their sam will match manager sam
 * @param  {object} form    - the redux-form
 * @param  {string} key     - field of form to check
 * @param  {object} user    - user to check sam account
 * @return {bool}           - true if users sam matches key of form
 */
const getRoleInForm = (form, key, user) => {
  // make sure form exists (redux-form takes a while to load)
  if (form) {
    if (debug)
      console.log(`\tgetRoleInForm : form exists`);

    // do case insensitive comparison of user sam to sam in form field
    let re = new RegExp('^' + escape(form[key]) + '$', 'i');
    if (debug)
      console.log(`\tgetRoleInForm : re: ${re}`);
    if (re.test(escape(user[KEYS.USER_SAM]))) {
      if (debug)
        console.log(`\tgetRoleInForm : form[${key}]: ${form[key]}, user sam: ${user[KEYS.USER_SAM]}`);
      return true;
    }
  }
  return false;
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.requestForm, mainForm: getFormValues('form')(state),
  auth: state.auth,
  empDir: state.empDir
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...empDirActions,
    ...requestFormActions
  }, dispatch)
});

FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(FormPage);
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
