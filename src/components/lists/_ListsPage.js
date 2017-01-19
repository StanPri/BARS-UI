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
    this.state = {
      record: {
        section_1_name: '',
        section_1_company_name: '',
        section_1_work_phone: '',
        section_1_cell_phone: '',
        section_1_license: '',
        section_1_company_address: '',
        section_1_division: '',
        section_1_unit: '',
        section_1_request_date: '',
        section_1_supervisor_name: '',
        section_1_supervisor_phone: '',
        section_2_reason: '',
        section_2_hours: '',
        section_2_areas: [''],
        section_3_access_levels: [''],
        section_3_issue_date: '',
        section_3_expiration_date: '',
        section_3_keycard: '',
        section_3_admin_name: '',
        terms_name: ''
      }
    };
  }

  recordRow(record, index) {
    return <div key={index}>{record.section_1_name}</div>;
  }

  render() {
    return (
      <div>
        <Link to="/form">FormPage</Link>
        <Button>New Request</Button>
        <RequestTable title="Approvals" />
        <RequestTable title="Requests" />
        <br/>

        <h3>Existing Requests</h3>
          {this.props.records.map(this.recordRow)}
        <br/>

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
  actions: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
