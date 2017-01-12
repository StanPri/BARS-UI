import React, {PropTypes} from 'react';
import {Col, Grid, Row, Table, Button} from 'react-bootstrap';
import RequestTableRow from './RequestTableRow';

RequestTable.propTypes = {
  title: PropTypes.string.isRequired
};

function RequestTable(props) {
  return (
    <Row>
      <Col xs={12}>
        <h3>{props.title}</h3>
        <Table>
          <thead>
            <tr>
              <th className="col-xs-1"/>
              <th className="col-xs-1">Status</th>
              <th className="col-xs-2">Name</th>
              <th className="col-xs-1">Phone</th>
              <th className="col-xs-2">Email</th>
              <th className="col-xs-2">Supervisor</th>
              <th className="col-xs-1">Phone</th>
              <th className="col-xs-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {/* rows.map(row => <RequestTableRow key={row.id} ...rowdata />) */}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default RequestTable;
