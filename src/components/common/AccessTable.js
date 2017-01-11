import React, {PropTypes} from 'react';
import {Col, Grid, Row, Table, Button} from 'react-bootstrap';

AccessTable.propTypes = {
  title: PropTypes.string.isRequired
};

function AccessTable(props) {
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

          </Table>
      </Col>
    </Row>
  );
}

export default AccessTable;
