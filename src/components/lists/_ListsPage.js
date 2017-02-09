/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';
import * as requestsActions from '../../actions/requestsActions';
import * as KEYS from '../../store/keyMap';

let debug = false;

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {actions, auth} = this.props;
    // load all users requests that require users approval
    actions.requestsGetApprovals();
    // load all users requests that do not require users approval
    actions.requestsGetUser();
  }

  render() {
    const {requestsUser, auth} = this.props;
    return (
      <div>
        {/* show all users requests that require users approval */}
        <RequestTable title="Approvals" rows={requestsUser.approvals}/>
        {/* show all users requests that do not require users approval */}
        <RequestTable title="Requests" rows={requestsUser.requests}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({requestsUser: state.requestsUser, auth: state.auth});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestsActions
    }, dispatch)
  };
}

ListsPage.propTypes = {
  requestsUser: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
