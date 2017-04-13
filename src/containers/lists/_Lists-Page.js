/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// librarires
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
// components
import RequestTable from '../../components/common/RequestTable';
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import * as requestsActions from '../../actions/requestsActions';
import * as requestFormActions from '../../actions/requestFormActions';
import * as KEYS from '../../store/keyMap';

let debug = false;

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.viewRequest = this.viewRequest.bind(this);
    this.getRequests = this.getRequests.bind(this);
  }

  componentDidMount() {
    this.getRequests();
  }

  getRequests() {
    const {actions, fetchCallsInProgress} = this.props;
    // if no fetches in progess and less than max tries
    if (!fetchCallsInProgress) {
      // load all users requests that do not require users
      actions.requestsGetUser();
    } else {
      // other wise wait adn try again
      setTimeout(this.getRequests, 100);
    }
  }

  /**
   * Views the entry selected
   * Determines if the user is approving
   */
  viewRequest(data) {
    const {actions} = this.props;
    actions.requestFormView(data);
    browserHistory.push('/form');
  }

  render() {
    const {
      requestsUser: {
        approvals,
        requests
      },
      auth,
      fetchCallsInProgress,
      actions
    } = this.props;
    const {approvalsAttempts, requestsAttempts} = this.state;
    // display loading graphic if fetching
    if (fetchCallsInProgress) {
      return <FetchInProgress/>;
    }
    // handle api errors
    if (approvals.error) {
      return <DisplayError
        error={approvals.error}
        onClick={actions.requestsGetApprovals}/>;
    } else if (requests.error) {
      return <DisplayError
        error={requests.error}
        onClick={actions.requestsGetUser}/>;
    }
    return (
      <div>
        {/* show all users requests that require users approval */}
        <RequestTable
          title="Approvals"
          rows={approvals}
          onClick={this.viewRequest}/> {/* show all users requests that do not require users approval */}
        <RequestTable
          title="Requests"
          rows={requests}
          onClick={this.viewRequest}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({requestsUser: state.requestsUser, fetchCallsInProgress: state.fetchCallsInProgress, auth: state.auth});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestsActions,
      ...requestFormActions
    }, dispatch)
  };
}

ListsPage.propTypes = {
  requestsUser: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
