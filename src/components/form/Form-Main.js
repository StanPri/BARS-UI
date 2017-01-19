import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import * as KEYS from '../../store/keyMap';

// TODO: naming -> section titles, field names, labels, props
// TODO: help section -> how handled, on section title for sections? modal?
// tooltip? -> change title Buttons accordingly
// TODO: add options for select's

const FormMain = ({user, justifications}) => (
  <div>
    <Row>
      <Col xs={12}>
        <h2>
          Applicant Information
          <Button><Glyphicon glyph="question-sign"/></Button>
        </h2>
      </Col>
      <Col sm={6} md={3}>
        <Field component={FormInput} name="section_1_name" label="Name"/>
        <Field
          component={FormInput}
          name="section_1_company_name"
          label="Company Name"/>
        <Field
          component={FormInput}
          name="section_1_request_date"
          label="Request Date"
          type="date"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name="section_1_work_phone"
          label="Work Phone"
          type="tel"/>
        <Field
          component={FormInput}
          name="section_1_company_address"
          label="Company Address"/>
        <Field
          component={FormInput}
          name="section_1_supervisor_name"
          label="Supervisor Name"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name="section_1_cell_phone"
          label="Cell Phone"
          type="tel"/>
        <Field component={FormInput} name="section_1_division" label="Division"/>
        <Field
          component={FormInput}
          name="section_1_supervisor_phone"
          label="Supervisor Phone"
          type="tel"/>
      </Col>
      <Col sm={6} md={3}>
        <Field component={FormInput} name="section_1_license" label="License Plate"/>
        <Field component={FormInput} name="section_1_unit" label="Unit/Project"/>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <h2>
          Access Requirements
          <Button><Glyphicon glyph="question-sign"/></Button>
        </h2>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name="section_2_reason"
          label="Reason"
          options={['Reason1', 'Reason2', 'Reason3']}/>
        <Field
          component={FormSelect}
          name="section_2_hours"
          label="Hours"
          options={['Hours1', 'Hours2', 'Hours3']}/>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name="section_2_areas"
          label="Areas"
          options={['Area1', 'Area2', 'Area3']}
          multiple/> {justifications.fields[KEYS.JUSTIFICATIONS_OTHER] && <Field component={FormInput} name="section_2_area_other" label="Other Area"/>}
      </Col>
      {user[KEYS.USER_IS_VENDOR] && <Col sm={6} md={4}>
        <Field
          component={FormInput}
          name="section_2_project_start"
          label="Project Start Date (Vendors Only)"
          type="date"/>
        <Field
          component={FormInput}
          name="section_2_project_end"
          label="Project End Date (Vendors Only)"
          type="date"/>
      </Col>}
      <Col xs={12}>
        <span className="pull-right">Fields marked with an asterik (*) require an
          explanation in the Justifications section</span>
      </Col>
    </Row>
  </div>
);

FormMain.PropTypes = {
  user: PropTypes.object.isRequired,
  justifications: PropTypes.object.isRequired
};

export default FormMain;
