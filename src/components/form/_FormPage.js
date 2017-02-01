/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import FormMain from './Form-Main';
import FormJustifications from './Form-Justifications';
import FormSecurity from './Form-Security';
import FormApproval from './Form-Approval';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as KEYS from '../../store/keyMap';

// TODO: remove mock after submit figured out
import {MOCK_results} from '../../MOCK/showResults';

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
      formMainNamehidden: true
    };
    this.formMainNameHandleInput = this.formMainNameHandleInput.bind(this);
    this.formMainNamesHandleClick = this.formMainNamesHandleClick.bind(this);
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
  }

  /**
   * Handles clicking name from list that was generated based off search
   * Populates fields in form based off selection
   * Hides list when clicked
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
  }

  render() {
    const {handleSubmit, actions, user, empDir} = this.props;
    return (
      <form onSubmit={handleSubmit(MOCK_results)}>
        <FormMain
          formMainNameHandleInput={this.formMainNameHandleInput}
          formMainNamehidden={this.state.formMainNamehidden}
          formMainNames={this.state.formMainNames}
          formMainNamesOnClick={this.formMainNamesHandleClick}
          user={user}
          justifications={this.state.justifications}/> {this.state.justifications.display && <FormJustifications/>}
        {user[KEYS.USER_ROLE] === "security" && <FormSecurity/>}
        <FormApproval/>
      </form>
    );
  }
}

FormPage.propTypes = {
  empDir: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {initialValues: state.requestForm.data, user: state.user, empDir: state.empDir};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestFormActions
    }, dispatch)
  };
}

FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(FormPage);
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
