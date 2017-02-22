import React, { Component, PropTypes } from 'react';
import { Row } from 'react-bootstrap';

/**
 * Displays header for forms
 * @param {string}  header      - text to display for heading
 * @param {bool}    centered    - displays hr if true
 * @return JSX
 */
const FormHeader = ({ header, centered }) => {
  let _centered = centered
    ? "text-center"
    : "";
  return (
    <Row className={_centered}>
      <h2>{header}</h2>
      {centered && <hr/>}
    </Row>
  );
};

FormHeader.propTypes = {
  header: PropTypes.string.isRequired,
  centered: PropTypes.bool
};

export default FormHeader;
