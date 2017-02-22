/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import * as requestsActions from '../../actions/requestsActions';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {actions, fetchCallsInProgress} = this.props;
    const getRequests = () => {
      // load all requests
      actions.requestsGetAll();
    };
    // if no fetches in progess
    if (!fetchCallsInProgress) {
      // call BARS API
      getRequests();
    } else {
      // other wise wait adn call API
      setTimeout(getRequests, 1000); // TODO: change to loop that checks if jwt loaded
    }
  }

  render() {
    const {requestsAll, fetchCallsInProgress, actions} = this.props;
    // display loading graphic if fetching
    if (fetchCallsInProgress) {
        return <FetchInProgress />;
    }
    // handle api errors
    if (requestsAll.error) {
        return <DisplayError error={requestsAll.error} onClick={actions.requestsGetAll} />;
    }
    return (
      <div>
        <RequestTable table="requestsAll" title="All Requests" rows={requestsAll}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    requestsAll: state.requestsAll,
    fetchCallsInProgress: state.fetchCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestsActions
    }, dispatch)
  };
}

// TODO: more specific proptypes...
SearchPage.propTypes = {
  requestsAll: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
