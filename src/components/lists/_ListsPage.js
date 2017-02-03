/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import RequestTable from '../common/RequestTable';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {requestsUser} = this.props;
    return (
      <div>
        <RequestTable
          table="requestsUser.approvals"
          title="Approvals"
          rows={requestsUser.approvals}/>
        <RequestTable
          table="requestsUser.requests"
          title="Requests"
          rows={requestsUser.requests}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({requestsUser: state.requestsUser});

const mapDispatchToProps = () => ({});

// TODO: more specific proptypes...
ListsPage.propTypes = {
  requestsUser: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
