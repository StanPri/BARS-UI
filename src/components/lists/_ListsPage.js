/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';
import * as requestFormActions from '../../actions/requestFormActions';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRequestFormNew = this.handleRequestFormNew.bind(this);
  }

  handleRequestFormNew() {
    const {actions, destroy} = this.props;
    destroy();
    actions.requestFormNew();
    browserHistory.push('/form');
  }

  render() {
    const {requestsUser} = this.props;
    return (
      <div>
        <Button onClick={this.handleRequestFormNew}>New Request</Button>
        <RequestTable table="requestsUser.approvals" title="Approvals" rows={requestsUser.approvals}/>
        <RequestTable table="requestsUser.requests" title="Requests" rows={requestsUser.requests}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {requestsUser: state.requestsUser};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestFormActions
    }, dispatch)
  };
}

// TODO: more specific proptypes...
ListsPage.propTypes = {
  requestsUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  destroy: PropTypes.func.isRequired
};

ListsPage = reduxForm({form: 'form', destroyOnUnmount: false, forceUnregisterOnUnmount: true})(ListsPage);
export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
