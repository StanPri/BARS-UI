import React, {PropTypes} from 'react';
import {Col, Grid, Row, Table, Button} from 'react-bootstrap';
import RequestTableRow from './RequestTableRow';

RequestTable.propTypes = {};

function RequestTable(props) {
  return (
    <tr>
      <td>
        <Button>View</Button>
      </td>
      <td>"status"</td>
      <td>"name"</td>
      <td>"phone"</td>
      <td>"email"</td>
      <td>"sup_name"</td>
      <td>"sup_phone"</td>
      <td>"sup_email"</td>
    </tr>
  );
}

export default RequestTable;
