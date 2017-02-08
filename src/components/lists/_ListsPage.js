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
    // load all requests from api
    if (auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY) {
      actions.requestsGetSecurity();
    }
    actions.requestsGetUser();
  }

  render() {
    const {requestsUser, auth} = this.props;
    return (
      <div>
        {/* show security approvals if security */}
        {auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY && <RequestTable title="Pending Approvals" rows={requestsUser.security}/>}
        {/* show manager approvals if manager */}
        {auth[KEYS.USER_ROLE] === KEYS.ROLE_MANAGER && <RequestTable title="Pending Approvals" rows={requestsUser.approvals}/>}
        {/* show users requests for all roles */}
        <RequestTable title="Previous Requests" rows={requestsUser.requests}/>
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
