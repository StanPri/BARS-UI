/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change, getFormValues} from 'redux-form';
import FormMain from './Form-Main';
import FormSecurity from './Form-Security';
import FormTerms from './Form-Terms';
import FormApproval from './Form-Approval';
import FormSubmit from './Form-Submit';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

const debug = 0;

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
      formMainSelected: {}
    };
    this.formMainNameHandleInput = this.formMainNameHandleInput.bind(this);
    this.formMainNamesHandleClick = this.formMainNamesHandleClick.bind(this);
    this.formApprovalHandleReject = this.formApprovalHandleReject.bind(this);
    this.formHandleSubmit = this.formHandleSubmit.bind(this);
  }

  componentDidMount() {
    // load employee directory from api for selecting name from list
    this.props.actions.empDir();
  }

  formHandleSubmit(vals) {
    window.alert('SUBMITTING: ' + JSON.stringify(vals, null, 2));

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
    const {dispatch} = this.props;
    const {formMainNames} = this.state;
    let id = e.target.dataset.id; // get employees sam account
    let employee = formMainNames.byId[id]; // look up employee from list of employees
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
    dispatch(change('form', KEYS.FORM_SUP_PHONE, manager[KEYS.USER_CELL])); // set managers phone
    this.setState({formMainNamehidden: true}); // hide the list of names
  }

  /**
   * Handles rejecting a request
   * @param {event} e - click event
   */
  formApprovalHandleReject(e) {
    e.preventDefault();
    alert(`Handling Reject...
      TODO: open <FormReject/> in modal, capture reason, styling`);
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
      ? auth[KEYS.USER_SAM] !== mainForm[KEYS.FORM_SAM_RECEIVE] && auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY)
      : auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY);
    // check that form state is waiting security approval or higher
    let formStatus = mainForm
      ? + mainForm[KEYS.FORM_STATUS]
      : 0;

    // check that user is recipient (in name field of form)
    let isRecipient = mainForm
      ? auth[KEYS.USER_SAM] === mainForm[KEYS.FORM_SAM_RECEIVE]
      : false;
    if (debug)
      console.log(`_FormPage.js\tisRecipient: ${isRecipient}, sam: ${auth[KEYS.USER_SAM]}, sam_recieve: ${mainForm
        ? mainForm[KEYS.FORM_SAM_RECEIVE]
        : false}`);

    // check that user is in approving manager (supervisor field on form)
    let isManager = mainForm
      ? auth[KEYS.USER_SAM] === mainForm[KEYS.FORM_SAM_SUPER]
      : false;
    if (debug)
      console.log(`_FormPage.js\tisManager: ${isManager}, sam: ${auth[KEYS.USER_SAM]}, super: ${mainForm
        ? mainForm[KEYS.FORM_SAM_SUPER]
        : false}`);

    return (
      <form onSubmit={handleSubmit(actions.submitNewRequest)}>
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
          disabled={!(!formStatus || (isManager && formStatus === KEYS.STATUS_PEND_MGR))}/> {/* Manager terms form
          - show if manager and new form, manager and manager approval, or higher than manager approval
          - disable if not manager in new form or waiting manager approval state */}
        {((isManager && !formStatus) || (isManager && formStatus === KEYS.STATUS_PEND_MGR) || formStatus > KEYS.STATUS_PEND_MGR) && <FormTerms
          role={KEYS.ROLE_MANAGER}
          name={mainForm[KEYS.FORM_SUP_NAME]}
          disabled={!(isManager && !formStatus || formStatus === KEYS.STATUS_PEND_MGR)}/>}
        {/* Recipient terms form
          - show if recipient and recipient approval, or higher than recipient approval
          - disable if not recipient in waiting recipient approval state */}
        {((isRecipient && formStatus === KEYS.STATUS_PEND_REC) || formStatus > KEYS.STATUS_PEND_REC) && <FormTerms
          role={KEYS.ROLE_RECIPIENT}
          name={mainForm[KEYS.FORM_NAME]}
          disabled={!(isRecipient && formStatus === KEYS.STATUS_PEND_REC)}/>}
        {/* Security form
          - show if security and security approval, or higher than security
          - disable if not security, or security and in recipient field, or past security approval state */}
        {(isSecurity && formStatus === KEYS.STATUS_PEND_SEC || formStatus > KEYS.STATUS_PEND_SEC) && <FormSecurity
          disabled={!isSecurity || (isSecurity && isRecipient) || (formStatus > KEYS.STATUS_PEND_SEC)}/>}
        {/* Submit/Approve buttons
          - show submit buttons if new request
          - show approval buttons if not new request,
              is manager and in manager approval state, or
              is recipient in recipient approval state, or
              is security who is not recipient and in security approval state
          - disable if approved or higher status */}
        {(!formStatus && <FormSubmit onReset={reset}/>) || ((isManager && formStatus === KEYS.STATUS_PEND_MGR) || (isRecipient && formStatus === KEYS.STATUS_PEND_REC) || (isSecurity && !isRecipient && formStatus === KEYS.STATUS_PEND_SEC)) && <FormApproval onReject={this.formApprovalHandleReject}/>}
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

function mapStateToProps(state, ownProps) {
  return {
    initialValues: state.requestForm, mainForm: getFormValues('form')(state),
    auth: state.auth,
    empDir: state.empDir
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...empDirActions,
      ...requestFormActions
    }, dispatch)
  };
}

FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(FormPage);
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
