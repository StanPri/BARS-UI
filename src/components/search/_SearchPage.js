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
import RequestTable from '../common/RequestTable';
import * as formActions from '../../actions/formActions';

import {Table as ReactTable} from 'reactable';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(formActions, dispatch)
  };
}

ListsPage.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
