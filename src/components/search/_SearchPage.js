import React, {PropTypes} from 'react';
import {
  Col,
  Grid,
  Row,
  Table,
  Button,
  ButtonGroup,
  Glyphicon,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as recordActions from '../../actions/recordActions';
import RequestTable from '../common/RequestTable';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        SEARCH PAGE
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {records: state.records};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  };
}

ListsPage.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
