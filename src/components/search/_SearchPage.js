/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';
import * as requestsActions from '../../actions/requestsActions';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // load all requests from api
    this.props.actions.requestsGetAll();
  }

  render() {
    const {requestsAll, actions} = this.props;
    return (
      <div>
        <RequestTable table="requestsAll" title="All Requests" rows={requestsAll}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {requestsAll: state.requestsAll};
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
