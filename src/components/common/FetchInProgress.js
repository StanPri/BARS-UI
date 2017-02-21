import React from 'react';
import {Row, Col} from 'react-bootstrap';

const FetchInProgress = () => (
  <Row>
    <Col xs={4} xsOffset={4}>
      <div className='uil-ripple-css'><div/><div/></div>
    </Col>
  </Row>
);

export default FetchInProgress;
