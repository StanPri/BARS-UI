/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change, touch, getFormValues} from 'redux-form';
import {browserHistory} from 'react-router';
// wizard pages
import WizardAccess from './Wizard-Access';
import WizardApprover from './Wizard-Approver';
import WizardCompany from './Wizard-Company';
import WizardRecipient from './Wizard-Recipient';
import WizardJustifications from './Wizard-Justifications';
import WizardTerms from './Wizard-Terms';
// actions, constants, etc
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import validate from '../form/validate';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

const debug = 0;

/**
 * Main page container for wizard form
 * Displays when new request
 * See http://redux-form.com/6.5.0/examples/wizard/ for example
 */
class WizardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,                              // current page of wizard form
      recipientNames: initialState.empDir,  // list of recipient names when on recipient page
      recipientNamesHidden: true,           // hide recipient names when on recipient page
      approving: false,                     // set when selecting approver name, will render approver terms
      approverName: "",
      approverNames: [
        {[KEYS.USER_NAME]: KEYS.USER_NAME, //: 'No supervisor Listed',
        [KEYS.USER_SAM]: 'Unknown',
        [KEYS.USER_EMAIL]: "",
        [KEYS.USER_PHONE]: ""},
        {[KEYS.USER_NAME]: KEYS.USER_NAME, //: 'No Supervisor\'s Manager Listed',
        [KEYS.USER_SAM]: 'Unknown',
        [KEYS.USER_EMAIL]: "",
        [KEYS.USER_PHONE]: ""}
      ],   // list of manager names when on approver page
      approversUpdate: false,
      justifications: [],                   // list of justifications tht are needed
      justificationsUpdate: false,          // handles updating jsutificatinos after state has been set (componentDidUpdate)
      accessDisplayOtherArea: false,        // handles is other area selected, display field to enter other area
      fieldsDisabled: {                     // which fields are disbaled
        // recipient
        [KEYS.FORM_EMAIL]: true,
        [KEYS.FORM_PHONE]: true,
        [KEYS.FORM_CELL]: true,
        [KEYS.FORM_EMAIL]: true,
        [KEYS.FORM_LICENSE]: true,
        // approver
        [KEYS.FORM_SUP_NAME]: false,
        [KEYS.FORM_SUP_EMAIL]: true,
        [KEYS.FORM_SUP_PHONE]: true
      }
    }

    // bind api functions
    this.formHandleSubmit = this.formHandleSubmit.bind(this);
    this.loadEmpDir = this.loadEmpDir.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    // bind page functions
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    // bind recipient functions
    this.recipientHandleInput = this.recipientHandleInput.bind(this);
    this.recipientHandleClick = this.recipientHandleClick.bind(this);
    // bind approver functions
    this.approversHandleChange = this.approversHandleChange.bind(this);
    this.updateApprovers = this.updateApprovers.bind(this);
    // bind justifications functions
    this.updateJustifications = this.updateJustifications.bind(this);
    this.accessHandleChange = this.accessHandleChange.bind(this);
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////     LIFECYCLE FUNCTIONS     ////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadEmpDir();
  }

  componentDidUpdate() {
    this.updateJustifications();
    this.updateOnRefresh();
    this.updateApprovers();
  }
  /**
   * Resets values when mounted (ex if press "New Request" while on wizard)
   */
  updateOnRefresh() {
    const {wizardValues} = this.props;
    const {page} = this.state;
    if (!wizardValues && page !== 1) {
      this.setState({page: 1});
      this.setState({approving: false});
      this.setState({approverName: ""});
      this.setState({justifications: []});
      this.setState({fieldsDisabled: {                     // which fields are disbaled
        // recipient
        [KEYS.FORM_EMAIL]: true,
        [KEYS.FORM_PHONE]: true,
        [KEYS.FORM_CELL]: true,
        [KEYS.FORM_EMAIL]: true,
        [KEYS.FORM_LICENSE]: true,
        // approver
        [KEYS.FORM_SUP_NAME]: false,
        [KEYS.FORM_SUP_EMAIL]: true,
        [KEYS.FORM_SUP_PHONE]: true
      }});
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////     API FUNCTIONS     ////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Handles loading employee directory data
   * Used for populating names and supervisor names lists
   */
  loadEmpDir() {
    const { actions } = this.props;
    // load employee directory from api for selecting name from list
    actions.empDir();
  }
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
   * Handles submitting requests (submit/approve buttons)
   * @param {object} vals       - values from redux-form
   */
  formHandleSubmit(vals) {
    if (debug) console.log("\tformHandleSubmit:\tvals: ", vals);
    const {actions} = this.props;
    actions.submitNewRequest(vals); // submit new request
    this.handleRedirect();          // redirect to homepage
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     JUSTIFICATIONS FUNCTIONS     /////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * handles updating justifications needed
   * (checks in componentDidUpdate)
   */
  updateJustifications() {
    const {wizardValues} = this.props;
    const {justificationsUpdate} = this.state;
    const _justifications = [];
    let otherAreaDisplay = false;
    // if form mounted and justification update needed (need tp keep track for componentDidMount to work)
    if (wizardValues && justificationsUpdate) {
      // check area sections
      if (wizardValues[KEYS.FORM_AREAS]) {
        // set justifiction needed if requried field set
        wizardValues[KEYS.FORM_AREAS].forEach(key => {
          let value = KEYS.OPTIONS_AREA[+key].justification;
          if (value) {
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
      if (wizardValues[KEYS.FORM_REASON]) {
        // set justification needed if required reason set
        if (KEYS.OPTIONS_REASON[+wizardValues[KEYS.FORM_REASON]].justification) {
          _justifications.push(KEYS.OPTIONS_REASON[+wizardValues[KEYS.FORM_REASON]]);
        }
      }
      // check hours section
      if (wizardValues[KEYS.FORM_HOURS]) {
        // set justification needed if required hour set
        if (KEYS.OPTIONS_HOURS[+wizardValues[KEYS.FORM_HOURS]].justification) {
          _justifications.push(KEYS.OPTIONS_HOURS[+wizardValues[KEYS.FORM_HOURS]]);
        }
      }
      // update state and make componentDidMount not go into endless loop
      this.setState({justificationsUpdate: false});
      this.setState({justifications: _justifications});
    }
  }

  accessHandleChange(e) {
    this.setState({justificationsUpdate: true});
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     APPROVERS FUNCTIONS     /////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * handles updating approvers needed
   * (checks in componentDidUpdate)
   */

  /**
   * Handles form changing on supervisors page
   * Sets if values should be updated
   */
  updateApprovers() {
    const {wizardValues, dispatch, auth} = this.props;
    const {approverNames, approversUpdate} = this.state;

    // check if need to update (see updateJustifications)
   if(wizardValues && approversUpdate) {
      // check which manager is selected
      let selected = +wizardValues[KEYS.FORM_APPROVERS];
      if (selected > -1) {
        dispatch(change('wizard', KEYS.FORM_IS_ESCALATED, selected)); // 0 or 1
        if (auth[KEYS.USER_SAM] === approverNames[selected][KEYS.USER_SAM]) {
          this.setState({approving: true});
          this.setState({approverName: approverNames[selected][KEYS.USER_NAME]})
          dispatch(change('wizard', KEYS.FORM_APPROVER_NAME, approverNames[selected][KEYS.USER_NAME]));
        }
        else {
          this.setState({approving: false});
        }
      }
      this.setState({approversUpdate: false});
    }
  }

  approversHandleChange(){
    this.setState({approversUpdate: true});
  }

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////     CURRENT PAGE FUNCTIONS     ///////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Sets next page of wizard form
   * Skips Justifications page if none needed
   */
  nextPage() {
    const {page, justifications, approving} = this.state;
    // if no justifications and approving skip next page (justifications page)
    let next = page === 4 && !justifications.length && approving ? page + 2 : page + 1;
    this.setState({ page: next });
  }

  /**
   * Sets previous page of wizard form
   * Skips Justifications page if none needed
   */
  previousPage() {
    const {page, justifications, approving} = this.state;
    // if no justifications and approving skip prev page (justifications page)
    let prev = page === 6 && !justifications.length && approving ? page - 2 : page - 1;
    this.setState({ page: prev });
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////     RECIPIENT FUNCTIONS     ////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Handles typing name into recipient name field
   * Will display list of names filtered based off input
   * List comes from employee directory
   * @param {event} e       - input event (onInput)
   */
  recipientHandleInput(e) {
    e.preventDefault();
    let {empDir, dispatch} = this.props;
    if (e.target.value.length) {
      let _search = '(?=.*' + e.target.value.split(/, +|,| +/).join(')(?=.*') + ')';
      let re = new RegExp(_search, 'i');
      // filter list of employees in name list
      let _employees = empDir.allIds.filter(id => {
        if (`${empDir.byId[id][KEYS.USER_NAME]}`.match(re)) {
          return true;
        }
        return false;
      });
      // set list of names to select from and display it
      this.setState({
        recipientNames: {
          allIds: _employees,
          byId: empDir.byId
        },
        recipientNamesHidden: false
      });
    } else {
      // if empty input hide list
      this.setState({recipientNames: initialState.empDir, recipientNamesHidden: true});
    }
    // blank recipient sam to check if user from list selcted
    dispatch(change('wizard', KEYS.FORM_SAM_RECEIVE, ""));
  }

  /**
   * TODO: seperate to common functions for finding employee info (use in manager aswell)s
   * Handles selecting a name from recipient name field
   * List selecting from populated by recipientHandleInput
   * @param {event} e       - input event (onClick)
   */
  recipientHandleClick(e) {
    e.preventDefault();
    const {dispatch, empDir, auth} = this.props;
    const {recipientNames, fieldsDisabled, approverNames} = this.state;
    let _fieldsDisabled = fieldsDisabled;
    let _approverNames = approverNames;
    // get employees sam account (set by mapping of names on data-id)
    let id = e.target.dataset.id;
    /////////// SUBMITTER (TODO:move to common function) ////////////////
    // TODO! JWT CHARS , make conistent from api...
    let submitter = empDir.byId[auth[KEYS.USER_SAM]];
    dispatch(change('wizard', KEYS.FORM_SUBMIT_EMAIL, submitter[KEYS.USER_EMAIL]));
    /////////// RECIPIENT (TODO:move to common function) ////////////////
    // look up employee who has this sam
    let recipient = recipientNames.byId[id];
    // field map to use for setting editable / updting fields
    let recipient_fields = {
      [KEYS.FORM_EMAIL]: KEYS.USER_EMAIL,
      [KEYS.FORM_PHONE]: KEYS.USER_PHONE,
      [KEYS.FORM_CELL]: KEYS.USER_CELL,
      [KEYS.FORM_LICENSE]: KEYS.FORM_LICENSE
    };
    // hide the list of names
    this.setState({recipientNamesHidden: true});
    // set fields based off selected employee if they exist
    // otherwise make field editable
    Object.keys(recipient_fields).forEach(key => {
      let user_key = recipient_fields[key];
      let val = recipient[user_key];
      // if field has value
      if (val) {
        // change value in redux form
        dispatch(change('wizard', key, val));
        // make field disabled
        _fieldsDisabled[key] = true;
      }
      else {
        // change value in redux form to empty
        dispatch(change('wizard', key, ''));
        // make field editable if no value found
        _fieldsDisabled[key] = false;
      }
    });
    // change reduxfields based off recipient info
    dispatch(change('wizard', KEYS.FORM_NAME, recipient[KEYS.USER_NAME]));
    dispatch(change('wizard', KEYS.FORM_SAM_RECEIVE, recipient[KEYS.USER_SAM]));

    // if they have a manager set in employee directory listing
    if (recipient[KEYS.ED_MANAGER_SAM]) {
      // look up manager of employee
      let approver = empDir.byId[recipient[KEYS.ED_MANAGER_SAM]];
      _approverNames[0][KEYS.USER_NAME] = approver[KEYS.USER_NAME];
      _approverNames[0][KEYS.USER_SAM] = approver[KEYS.USER_SAM];
      _approverNames[0][KEYS.USER_EMAIL] = approver[KEYS.USER_EMAIL];
      _approverNames[0][KEYS.USER_PHONE] = approver[KEYS.USER_PHONE];
      _approverNames[0]['approversUpdate'] = 0;

      // if they have a manager's manager set in employee directory listing
      if (approver[KEYS.ED_MANAGER_SAM]) {
        // look up manager's manager of employee
        let approverManager = empDir.byId[approver[KEYS.ED_MANAGER_SAM]];
         _approverNames[1][KEYS.USER_NAME] = approverManager[KEYS.USER_NAME];
         _approverNames[1][KEYS.USER_SAM] = approverManager[KEYS.USER_SAM];
         _approverNames[1][KEYS.USER_EMAIL] = approverManager[KEYS.USER_EMAIL];
         _approverNames[1][KEYS.USER_PHONE] = approverManager[KEYS.USER_PHONE];
         _approverNames[1]['approversUpdate'] = 1;
      }
    }

    // set approver name field as editable
    _fieldsDisabled[KEYS.FORM_SUP_NAME] = false;
    this.setState({fieldsDisabled: _fieldsDisabled});
    this.setState({approverNames: _approverNames});
  }

  render() {
    const {
      page,
      recipientNames,
      recipientNamesHidden,
      approving,
      approverNames,
      approverName,
      approverNamesHidden,
      justifications,
      accessDisplayOtherArea,
      fieldsDisabled
    } = this.state;
    const {
        empDir: {error},
        fetchCallsInProgress,
        actions
    } = this.props;
    // display loading graphic if fetching
    if (fetchCallsInProgress) {
        return <FetchInProgress />;
    }
    // handle api errors
    if (error) {
        return <DisplayError error={error} onClick={actions.empDir} />;
    }
    // Set props for different pages of wizard
    const WizardRecipientProps = {
      recipientHandleInput: this.recipientHandleInput,
      recipientHandleClick: this.recipientHandleClick,
      recipientNames: recipientNames,
      recipientNamesHidden: recipientNamesHidden,
      fieldsDisabled: fieldsDisabled,
      onSubmit: this.nextPage
    };
    const WizardCompanyProps = {
      fieldsDisabled: fieldsDisabled,
      previousPage: this.previousPage,
      onSubmit: this.nextPage
    };
    const WizardApproverProps = {
      approversHandleChange: this.approversHandleChange,
      approverNames: approverNames,
      fieldsDisabled: fieldsDisabled,
      previousPage: this.previousPage,
      onSubmit: this.nextPage
    };
    const WizardAccessProps = {
      accessHandleChange: this.accessHandleChange,
      accessDisplayOtherArea: accessDisplayOtherArea,
      previousPage: this.previousPage,
      onSubmit: (!justifications.length && !approving ? this.formHandleSubmit : this.nextPage),
      submitButton: (!justifications.length && !approving)
    };
    const WizardJustificationsProps = {
      justifications: justifications,
      previousPage: this.previousPage,
      onSubmit: (approving ? this.nextPage : this.formHandleSubmit),
      submitButton: !approving
    };
    const WizardTermsProps = {
      previousPage: this.previousPage,
      onSubmit: this.formHandleSubmit,
      approverName: approverName
    };
    return (<div>
        {page === 1 && <WizardRecipient {...WizardRecipientProps} />}
        {page === 2 && <WizardCompany {...WizardCompanyProps} />}
        {page === 3 && <WizardApprover {...WizardApproverProps} />}
        {page === 4 && <WizardAccess {...WizardAccessProps} />}
        {page === 5 && <WizardJustifications {...WizardJustificationsProps} />}
        {page === 6 && <WizardTerms {...WizardTermsProps} />}
      </div>
    )
  }
}

WizardPage.propTypes = {};

// map all state (from redux store) to props
const mapStateToProps = (state, ownProps) => ({
  empDir: state.empDir,
  auth: state.auth,
  fetchCallsInProgress: state.fetchCallsInProgress,
  wizardValues: getFormValues('wizard')(state)
});

// map all action creators to props
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...empDirActions,
    ...requestFormActions
  }, dispatch)
});

// connect to redux form
WizardPage = reduxForm({
  form: 'wizard',                   // <------ same form name
  destroyOnUnmount: false,          // <------ preserve form data
  forceUnregisterOnUnmount: true,   // <------ unregister fields on unmount
  validate
})(WizardPage);

// connect to redux using state and dispatch
WizardPage = connect(mapStateToProps, mapDispatchToProps)(WizardPage);

export default WizardPage;
