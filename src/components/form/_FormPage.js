/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change, formValueSelector} from 'redux-form';
import FormMain from './Form-Main';
import FormJustifications from './Form-Justifications';
import FormSecurity from './Form-Security';
import FormTerms from './Form-Terms';
import FormApproval from './Form-Approval';
import FormSubmit from './Form-Submit';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

// TODO: remove mock after submit figured out
import {MOCK_results} from '../../MOCK/showResults';

const debug = false;

/**
 * TODO: field validation
 * TODO: handle fields being uneditable
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
      formMainNamehidden: true
    };
    this.formMainNameHandleInput = this.formMainNameHandleInput.bind(this);
    this.formMainNamesHandleClick = this.formMainNamesHandleClick.bind(this);
    this.formApprovalHandleReject = this.formApprovalHandleReject.bind(this);
  }

  componentDidMount() {
    // load employee directory from api for selecting name from list
    this.props.actions.empDir();
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
        formMainNamehidden: false,
        formMainNameSam: ''
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
    dispatch(change('form', KEYS.FORM_NAME, employee.fullName));
    dispatch(change('form', KEYS.FORM_PHONE, employee.deskPhone));
    dispatch(change('form', KEYS.FORM_SUP_NAME, employee.manager));
    this.setState({formMainNamehidden: true});
    this.setState({formMainNameSam: employee.samAccount}); // TODO: handle manager
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
      initialValues
    } = this.props;
    let isSecurity = auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY;
    return (
      <form onSubmit={handleSubmit(MOCK_results)}>
        <FormMain
          formMainNameHandleInput={this.formMainNameHandleInput}
          formMainNamehidden={this.state.formMainNamehidden}
          formMainNames={this.state.formMainNames}
          formMainNamesOnClick={this.formMainNamesHandleClick}
          auth={auth}
          justifications={this.state.justifications}/> {this.state.justifications.display && <FormJustifications/>}
        {/* IF user has security role, show security section */}
        {isSecurity && <FormSecurity/>}
        {/* IF user is NOT security and NOT in name or manager fields, show terms and conditions, required field if present. */}
        {!isSecurity && (this.state.formMainNameSam === 'TODO:auth.samAccount' || this.state.formMainManagerSam === 'TODO:auth.samAccount') && <FormTerms auth={auth}/>}
        {/* IF no initalvalues, is new request, user is submitter ELSE existing request, user is not submitter */}
        {(!Object.keys(initialValues).length && <FormSubmit onReset={reset}/>) || <FormApproval onReject={this.formApprovalHandleReject}/>}
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
  return {initialValues: state.requestForm, auth: state.auth, empDir: state.empDir};
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
