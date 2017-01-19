import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import RequestTable from '../common/RequestTable';
import * as recordActions from '../../actions/recordActions';
import * as formActions from '../../actions/formActions';
import {MOCK_rows_apr, MOCK_rows_req} from '../../MOCK/rows';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // stans mapping of api recordRow(record, index) {  return <div
  // key={index}>{record.section_1_name}</div>; }

  render() {
    return (
      <div>
        {/* // stans mapping of api
          <h3>Existing Requests</h3>
          {this.props.records.map(this.recordRow)}
        <br/> */}

        <Link to="/form">New Request</Link>
        <RequestTable title="Approvals" rows={MOCK_rows_apr}/>
        <RequestTable title="Requests" rows={MOCK_rows_req}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {records: state.records};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      recordActions,
      formActions
    }, dispatch)
  };
}

ListsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
