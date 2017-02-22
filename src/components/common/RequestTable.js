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

  // add button to copy of rows
  // TODO: should this (and above stuff?) move to container...
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
          KEYS.FORM_SUP_NAME,
          KEYS.FORM_SUP_PHONE,
          KEYS.FORM_SUP_EMAIL
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
