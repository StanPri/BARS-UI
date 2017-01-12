import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const FormSecurity = props => (
  <Row>
    <Col xs={12}>
      <h2>
        Approvals
        <Button><Glyphicon glyph="question-sign"/></Button>
      </h2>
    </Col>
    <Col sm={6} md={3}>
      <Field component={FormSelect} name="section_3_access_levels" multiple="multiple" label="Access Levels" options={['Access1', 'Access2', 'Access3']}/>
    </Col>
    <Col sm={6} md={3}>
      <Field component={FormInput} name="section_3_issue_date" label="Issue Date" type="date"/>
    </Col>
    <Col sm={6} md={3}>
      <Field component={FormInput} name="section_3_expiration_date" label="Expiration Date" type="date"/>
    </Col>
    <Col sm={6} md={3}>
      <Field component={FormInput} name="section_3_keycard" label="Keycard No." type="number"/>
    </Col>
    <Col xs={12}>
      <Field component={FormInput} name="section_3_admin_name" label="Admin Name"/>
    </Col>
  </Row>
);

export default FormSecurity;
