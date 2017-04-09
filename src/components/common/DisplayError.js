import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

const DisplayError = ({error, onClick}) => (
  <Row>
    <Col xs={12} className="text-center">
      <h2>Sorry, something went wrong!</h2>
      <p>{error}</p>
      <Button onClick={onClick}>Try Again</Button>
    </Col>
  </Row>
);

export default DisplayError;
