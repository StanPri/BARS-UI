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
    this.handleLoadRequestsAll = this.handleLoadRequestsAll.bind(this);
  }

  handleLoadRequestsAll() {
    const {actions} = this.props;
    // actions.requestsGetAll();
    let URL = 'http://testEDAPI/employees'; // http://barsapi.technology.ca.gov/api/BadgeRequest
    fetch(URL).then(response => response.json()).then(json => {
      alert(json);
    });
  }

  render() {
    const {requestsAll} = this.props;
    return (
      <div>
        <Button onClick={this.handleLoadRequestsAll}>Load All</Button>
        <RequestTable title="All Requests" rows={requestsAll.allIds}/>
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
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
