/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import RequestTable from '../../components/common/RequestTable';
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import * as requestsActions from '../../actions/requestsActions';
import * as requestFormActions from '../../actions/requestFormActions';

class SearchPage extends React.Component {
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
    // if no fetches in progess
    if (!fetchCallsInProgress) {
      // load all requests from BARS API
      actions.requestsGetAll();
    } else {
      // other wise wait adn call API
      setTimeout(this.getRequests, 100);
    }
  }

  /**
   * Views the entry as non-approver (past requests, etc)
   */
  viewRequest(data) {
    const {actions} = this.props;
    actions.requestFormView(data);
    browserHistory.push('/form');
  }

  render() {
    const {requestsAll, fetchCallsInProgress, actions} = this.props;
    // display loading graphic if fetching
    if (fetchCallsInProgress) {
      return <FetchInProgress/>;
    }
    // handle api errors
    if (requestsAll.error) {
      return <DisplayError
        error={requestsAll.error}
        onClick={actions.requestsGetAll}/>;
    }
    return (
      <div>
        <RequestTable
          table="requestsAll"
          title="All Requests"
          rows={requestsAll}
          onClick={this.viewRequest}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {requestsAll: state.requestsAll, fetchCallsInProgress: state.fetchCallsInProgress};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestsActions,
      ...requestFormActions
    }, dispatch)
  };
}

// TODO: more specific proptypes...
SearchPage.propTypes = {
  requestsAll: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
