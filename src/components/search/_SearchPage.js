import React, {PropTypes} from 'react';
import {
  Col,
  Grid,
  Row,
  Table,
  Button,
  ButtonGroup,
  Glyphicon,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as itemActions from '../../actions/itemActions';
import RequestTable from '../common/RequestTable';
// import ReactTable from 'react-table';
import {Table as ReactTable} from 'reactable';
import {Tr as ReactTableTr} from 'reactable';

const DATA = [
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: 'Jason Maurer'
  }, {
    name: 'Tbbbbbbb',
    age: 22,
    friend: 'Jbbbbbb'
  }, {
    name: 'Tccccc',
    age: 99,
    friend: 'zzzzzz'
  }
];

const COLS = [
  {
    header: 'Name',
    accessor: 'name' // String-based value accessors !
  }, {
    header: 'Age',
    accessor: 'age',
    render: props => <span className='number'>props.value</span> // Custom cell components!
  }, {
    header: 'Friend Name',
    id: 'friendName',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }
];

class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ReactTable sortable={true} className="table" data={DATA} >
   </ReactTable>
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {items: state.items};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(itemActions, dispatch)
//   };
// }
//
// ListsPage.propTypes = {
//   actions: PropTypes.object.isRequired
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
export default ListsPage;
