import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Grid, Row, Button} from 'react-bootstrap';
import {Table, Thead, Th, Tr, Td} from 'reactable';
import RequestTableButton from './RequestTableButton';
import * as formActions from '../../actions/formActions';
import * as KEYS from '../../store/keyMap';

function RequestTable({rows, title, actions}) {
  // map column keys (from api) to labels (displayed text)
  const _columns = [
    {
      key: 'button',
      label: ""
    }, {
      key: KEYS.FORM_STATUS,
      label: "Status"
    }, {
      key: KEYS.FORM_NAME,
      label: "Name"
    }, {
      key: KEYS.FORM_PHONE,
      label: "Phone"
    }, {
      key: KEYS.FORM_EMAIL,
      label: "Email"
    }, {
      key: KEYS.FORM_SUP_NAME,
      label: "Supervisor"
    }, {
      key: KEYS.FORM_SUP_PHONE,
      label: "Supervisor Phone"
    }, {
      key: KEYS.FORM_SUP_EMAIL,
      label: "Supervisor Email"
    }
  ];
  // add button to rows
  const _data = rows;
  _data.forEach(row => row['button'] = <RequestTableButton
    status={row[KEYS.STATUS]}
    onClick={() => alert(`
      VIEW REQUEST BY ID\n
      - assumes entire request is redux store already
      - ID: ${row.id}
      - TODO:
        + how to populate redux-form from store?
        + get request by id, update form state
        + push form to history/change view to it
        + add test...
        +++ http://redux-form.com/6.0.0-alpha.6/examples/initializeFromState/`)}/>);

  return (
    <Row>
      <Col xs={12}>
        <h3>{title}</h3>
        <Table
          filterable={[
          KEYS.FORM_STATUS,
          KEYS.FORM_NAME,
          KEYS.FORM_PHONE,
          KEYS.FORM_EMAIL,
          KEYS.FORM_SUP_NAME,
          KEYS.FORM_SUP_PHONE,
          KEYS.FORM_SUP_EMAIL
        ]}
          noDataText={`No ${title}`}
          itemsPerPage={10}
          columns={_columns}
          sortable
          className="table table-bordered table-condensed"
          data={_data}/>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(formActions, dispatch)
});

RequestTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTable);
