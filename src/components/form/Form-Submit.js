import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

const FormSubmit = ({onReset}) => (
  <ButtonGroup>
    <Button onClick={onReset} >Clear</Button>
    <Button type="submit" bsStyle="primary">Submit</Button>
  </ButtonGroup>
);

FormSubmit.propTypes = {};

export default FormSubmit;
