import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

const FormSubmit = ({onReset}) => (
  <ButtonGroup>
    <Button type="submit" bsStyle="primary">Submit</Button>
    <Button onClick={onReset} >Clear</Button>
  </ButtonGroup>
);

FormSubmit.propTypes = {};

export default FormSubmit;
