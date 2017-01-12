/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as itemActions from '../../actions/itemActions';
import FormMain from './Form-Main';
import FormJustifications from './Form-Justifications';
import FormSecurity from './Form-Security';
import FormApproval from './Form-Approval';

// TODO: field validation

class FormPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      justifications: true,
      isSecurity: true
    };
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormMain/>
        {this.state.justifications && <FormJustifications/>}
        {this.state.isSecurity && <FormSecurity/>}
        <FormApproval/>
      </form>
    );
  }
}

FormPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {state: state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  };
}

FormPage = reduxForm({form: 'form'})(FormPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
