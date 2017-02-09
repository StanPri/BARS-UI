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
    window.alert(JSON.stringify(vals, null, 2));
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
    let id = e.target.dataset.id;
    let employee = formMainNames.byId[id];
    // TODO: consolidate this...
    dispatch(change('form', KEYS.FORM_NAME, employee.fullName));
    dispatch(change('form', KEYS.FORM_SAM_RECEIVE, employee.manager));
    dispatch(change('form', KEYS.FORM_PHONE, employee.deskPhone));
    dispatch(change('form', KEYS.FORM_SUP_NAME, employee.manager));
    dispatch(change('form', KEYS.FORM_SAM_SUPER, employee.manager));
    this.setState({formMainNamehidden: true});
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
    // check if new request
    let statusNew = mainForm
      ? !+ mainForm[KEYS.FORM_STATUS]
      : true;
    if (debug)
      console.log(`_FormPage.js\tstatusNew: ${statusNew}`);

    // user is security role
    let isSecurity = auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY;
    // check that form state is waiting security approval or higher
    let statusSecurity = mainForm
      ? + mainForm[KEYS.FORM_STATUS] >= + KEYS.STATUS_PEND_SEC
      : false;
    if (debug)
      console.log(`_FormPage.js\statusSecurity ${statusSecurity}, status: ${mainForm
        ? mainForm[KEYS.FORM_STATUS]
        : ''}, sec_pend_key: ${KEYS.STATUS_PEND_SEC} `);

    // check that form state is approved or higher
    let statusApproved = mainForm
      ? + mainForm[KEYS.FORM_STATUS] >= + KEYS.STATUS_APPROVED
      : false;
    if (debug)
      console.log(`_FormPage.js\statusApproved ${statusApproved}, status: ${mainForm
        ? mainForm[KEYS.FORM_STATUS]
        : ''}, approved_key: ${KEYS.STATUS_APPROVED} `);

    // check that user is recipient (in name field of form)
    let isRecipient = mainForm
      ? auth[KEYS.USER_SAM] === mainForm[KEYS.FORM_SAM_RECEIVE]
      : false;
    if (debug)
      console.log(`_FormPage.js\tisRecipient: ${isRecipient}, sam: ${auth[KEYS.USER_SAM]}, sam_recieve: ${mainForm
        ? mainForm[KEYS.FORM_SAM_RECEIVE]
        : false}`);

    // check that form state is waiting manager approval or higher
    let statusRecipient = mainForm
      ? + mainForm[KEYS.FORM_STATUS] >= + KEYS.STATUS_PEND_REC
      : false;
    if (debug)
      console.log(`_FormPage.js\statusRecipient ${statusRecipient}, status: ${mainForm
        ? mainForm[KEYS.FORM_STATUS]
        : ''}, rec_pend_key: ${KEYS.STATUS_PEND_REC} `);

    // check that user is in approving manager (supervisor field on form)
    let isManager = mainForm
      ? auth[KEYS.USER_SAM] === mainForm[KEYS.FORM_SAM_SUPER]
      : false;
    if (debug)
      console.log(`_FormPage.js\tisManager: ${isManager}, sam: ${auth[KEYS.USER_SAM]}, super: ${mainForm
        ? mainForm[KEYS.FORM_SAM_SUPER]
        : false}`);

    // check that form state is waiting manager approval or higher
    let statusManager = mainForm
      ? + mainForm[KEYS.FORM_STATUS] >= + KEYS.STATUS_PEND_MGR
      : false;
    if (debug)
      console.log(`_FormPage.js\tstatusManager ${statusManager}, status: ${mainForm
        ? mainForm[KEYS.FORM_STATUS]
        : ''}, mgr_pend_key: ${KEYS.STATUS_PEND_MGR} `);

    return (
      <form onSubmit={handleSubmit(this.formHandleSubmit)}>
        {/* Main form
          - show for all users
          - disable if not manager in manager approval state or new request */}
        <FormMain
          formMainNameHandleInput={this.formMainNameHandleInput}
          formMainNamehidden={this.state.formMainNamehidden}
          formMainNames={this.state.formMainNames}
          formMainNamesOnClick={this.formMainNamesHandleClick}
          auth={auth}
          justifications={this.state.justifications}
          disabled={!((isManager && statusManager && !statusRecipient) || statusNew)}/>
        {/* Security form
          - show if waiting security approval or higher
          - disable if not security, or security and in recipient field, or past security approval state */}
        {statusSecurity && <FormSecurity
          disabled={!isSecurity || (isSecurity && isRecipient) || (statusSecurity && statusApproved)}/>}
        {/* Manager terms form
          - show if in manager field, waiting manager approval or higher or a new request, and not the recipient
          - disable if waiting recipient approval or higher */}
        {isManager && (statusManager || statusNew) && !isRecipient && <FormTerms
          role={KEYS.ROLE_MANAGER}
          name={mainForm[KEYS.FORM_SUP_NAME]}
          disabled={statusRecipient}/>}
        {/* Recipient terms form
          - show if in recipient field, waiting recipient approval or higher, and not in manager field
          - disable if waiting security approval or higher */}
        {isRecipient && statusRecipient && !isManager && <FormTerms
          role={KEYS.ROLE_RECIPIENT}
          name={mainForm[KEYS.FORM_NAME]}
          disabled={statusSecurity}/>}
        {/* Submit/Approve buttons
          - show submit buttons if new request
          - show approval buttons if not new request and not approved or higher
          - disable if approved or higher status */}
        {(statusNew && <FormSubmit onReset={reset}/>) || (!statusApproved && <FormApproval onReject={this.formApprovalHandleReject}/>)}
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
