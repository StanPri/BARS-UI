/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, change, touch } from 'redux-form';
// actions, constants, etc
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import FormHeader from '../../components/form/Form-Header';
import validate from '../wizard/validate';
import initialState from '../../reducers/initialState';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

class FormPage extends Component {
  constructor( props ) {
    super( props )
    this.state = {};
  }
  render( ) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormHeader header="Recipient Information"/>
        {/* <FormRecipient allDisabled singleLine/>
        <FormCompany allDisabled singleLine/>
        <FormApprover allDisabled singleLine/>
        <FormAccess allDisabled singleLine/> */}
        {/* <FormJustifications allDisabled singleLine /> */}
      </form>
    );
  }
}

FormPage.propTypes = {};

// map all state (from redux store) to props
const mapStateToProps = ( state, ownProps ) => ({ fetchCallsInProgress: state.fetchCallsInProgress });

// map all action creators to props
const mapDispatchToProps = ( dispatch ) => ({actions: bindActionCreators( {}, dispatch )});

// connect to redux form
FormPage = reduxForm({
  form: 'form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount

})( FormPage );

// connect to redux using state and dispatch
FormPage = connect( mapStateToProps, mapDispatchToProps )( FormPage );

export default FormPage;
