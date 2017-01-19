/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import FormMain from './Form-Main';
import FormJustifications from './Form-Justifications';
import FormSecurity from './Form-Security';
import FormApproval from './Form-Approval';
import * as formActions from '../../actions/formActions';
import * as KEYS from '../../store/keyMap';

// TODO: remove mock data, replace with api call
import {MOCK_results} from '../../MOCK/showResults';

// TODO: field validation
// TODO: fill out when exisiting request
class FormPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      justifications: {
        display: true,
        fields: {
          [KEYS.JUSTIFICATIONS_OTHER]: true
        }
      }
    };
  }

  render() {
    const {handleSubmit, actions, user} = this.props;
    return (
      <form onSubmit={handleSubmit(MOCK_results)}>
        <FormMain user={user} justifications={this.state.justifications}/> {this.state.justifications.display && <FormJustifications/>}
        {user[KEYS.USER_ROLE] === "security" && <FormSecurity/>}
        <FormApproval/>
      </form>
    );
  }
}

FormPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {state, user: state.user};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(formActions, dispatch)
  };
}

// TODO: is destory needed true for prod?? (makes it so hot reload does not
// clear data)
FormPage = reduxForm({form: 'formPage', destroyOnUnmount: false})(FormPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
