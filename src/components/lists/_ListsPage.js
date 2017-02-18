/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';
import * as requestsActions from '../../actions/requestsActions';
import * as KEYS from '../../store/keyMap';
// mock data for testing
import * as mock from '../../mock/user';

let debug = false;

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {actions, fetchCallsInProgress} = this.props;
    const getRequests = () => {
      // load all users requests that require users approval
      actions.requestsGetApprovals();
      // load all users requests that do not require users approval
      actions.requestsGetUser();
    };
    // if no fetches in progess
    if (!fetchCallsInProgress) {
      // call BARS API
      getRequests();
    } else {
      // other wise wait adn call API
      setTimeout(getRequests, 1000);
    }
  }

  render() {
    const {requestsUser, auth} = this.props;
    return (
      <div>
        {mock.useMock.ED && <h1>Current user: {mock.user.sam}</h1>}
        {/* show all users requests that require users approval */}
        <RequestTable title="Approvals" rows={requestsUser.approvals}/> {/* show all users requests that do not require users approval */}
        <RequestTable title="Requests" rows={requestsUser.requests}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  requestsUser: state.requestsUser,
  fetchCallsInProgress: state.fetchCallsInProgress,
  auth: state.auth
});

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
