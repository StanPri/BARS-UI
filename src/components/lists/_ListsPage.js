/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
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
    const {actions, destroy} = this.props;
    return (
      <div>
        {/* // stans mapping of api
          <h3>Existing Requests</h3>
          {this.props.records.map(this.recordRow)}
        <br/> */}

        <Button
          onClick={() => {
          destroy();
          actions.formNew();
          browserHistory.push('/form');
        }}>New Request</Button>
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
      ...recordActions,
      ...formActions
    }, dispatch)
  };
}

ListsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  destroy: PropTypes.func.isRequired
};

ListsPage = reduxForm({form: 'formPage', destroyOnUnmount: false, forceUnregisterOnUnmount: true})(ListsPage);
export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
