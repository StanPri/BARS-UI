import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import MainForm from './MainForm';
import SecurityForm from './SecurityForm';
import SecurityAdminForm from './SecurityAdminForm';
import ManagerForm from './ManagerForm';
import RecipientForm from './RecipientForm';




class FormPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        status : false
    };
  }

  render () {
    return (
      <div>
        <MainForm/>
        <SecurityForm/>
        { status ? "Not a Security Admin" : <SecurityAdminForm/> }
        { status ? "Not a Manager": <ManagerForm/> }
        { status ? "Not a Recipient" : <RecipientForm/> }
      </div>
    );
  }
}

FormPage.propTypes = {

};

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
