import React, {PropTypes} from 'react';
import {Col, Grid, Row, Table, Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import AccessTable from '../common/AccessTable';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Button>New Request</Button>
        <AccessTable title="Approvals"/>
        <AccessTable title="Requests"/>
      </div>
      );
    }
}

  function mapStateToProps(state, ownProps) {
    return {
      items: state.items
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(itemActions, dispatch)
    };
  }

MainPage.propTypes = {
  actions: PropTypes.object.isRequired
};




export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
