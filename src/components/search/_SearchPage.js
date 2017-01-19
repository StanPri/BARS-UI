import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Table as ReactTable} from 'reactable';
import RequestTable from '../common/RequestTable';
import * as recordActions from '../../actions/recordActions';
import * as formActions from '../../actions/formActions';

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div/>);
  }
}

function mapStateToProps(state, ownProps) {
  return {records: state.records};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      recordActions,
      formActions
    }, dispatch)
  };
}

ListsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
