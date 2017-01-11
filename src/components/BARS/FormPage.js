import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import MainForm from './MainForm';
import SecurityForm from './SecurityForm';
import SecurityAdminForm from './SecurityAdminForm';
import ManagerForm from './ManagerForm';
import RecipientForm from './RecipientForm';


FormPage.propTypes = {

};

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
        if(status==="SecurityAdmin")
          <SecurityAdminForm/>
        else if(status ==="Manager")
          <ManagerForm/>
        else if(status ==="Recipient")
          <RecipientForm/>
      </div>
    );
  }
}

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
