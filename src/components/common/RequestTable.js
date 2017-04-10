import React, {PropTypes} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Table} from 'reactable';
import RequestTableButton from './RequestTableButton';
import * as KEYS from '../../store/keyMap';

function RequestTable({rows, title, onClick}) {
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
      key: KEYS.FORM_APPROVER_NAME,
      label: "Supervisor"
    }, {
      key: KEYS.FORM_APPROVER_EMAIL,
      label: "Supervisor Phone"
    }, {
      key: KEYS.FORM_APPROVER_PHONE,
      label: "Supervisor Email"
    }
  ];

  // add button to copy of rows
  const _data = rows.allIds.map(id => ({
    ...rows.byId[id],
    [KEYS.FORM_STATUS]: KEYS.STATUS_NAMES[rows.byId[id][KEYS.FORM_STATUS]],
    button: <RequestTableButton onClick={() => onClick(rows.byId[id])}/>
  }));

  const _itemsPerPage = rows.allIds.length > 15
    ? 15
    : 0;

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
          KEYS.FORM_APPROVER_NAME,
          KEYS.FORM_APPROVER_EMAIL,
          KEYS.FORM_APPROVER_PHONE
        ]}
          noDataText={`No ${title}`}
          columns={_columns}
          sortable
          itemsPerPage={_itemsPerPage}
          className="table table-bordered table-condensed"
          data={_data}/>
      </Col>
    </Row>
  );
}

RequestTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RequestTable;
