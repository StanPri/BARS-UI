import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import * as KEYS from '../../store/keyMap';

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
        <Field component={FormInput} name={KEYS.FORM_NAME} label="Name"/>
        <Field component={FormInput} name={KEYS.FORM_COMPANY} label="Company Name"/>
        <Field
          component={FormInput}
          name={KEYS.FORM_REQUEST_DATE}
          label="Request Date"
          type="date"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_PHONE}
          label="Work Phone"
          type="tel"/>
        <Field
          component={FormInput}
          name={KEYS.FORM_COMPANY_ADDRESS}
          label="Company Address"/>
        <Field component={FormInput} name={KEYS.FORM_SUP_NAME} label="Supervisor Name"/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_CELL}
          label="Cell Phone"
          type="tel"/>
        <Field component={FormInput} name={KEYS.FORM_DIVISION} label="Division"/>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_PHONE}
          label="Supervisor Phone"
          type="tel"/>
      </Col>
      <Col sm={6} md={3}>
        <Field component={FormInput} name={KEYS.FORM_LICENSE} label="License Plate"/>
        <Field component={FormInput} name={KEYS.FORM_UNIT} label="Unit/Project"/>
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
          name={KEYS.FORM_REASON}
          label="Reason"
          options={['Reason1', 'Reason2', 'Reason3']}/>
        <Field
          component={FormSelect}
          name={KEYS.FORM_HOURS}
          label="Hours"
          options={['Hours1', 'Hours2', 'Hours3']}/>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name={KEYS.FORM_AREAS}
          label="Areas"
          options={['Area1', 'Area2', 'Area3']}
          multiple/> {justifications.fields[KEYS.JUSTIFICATIONS_OTHER] && <Field component={FormInput} name={KEYS.FORM_AREA_OTHER} label="Other Area"/>}
      </Col>
      {user[KEYS.USER_IS_VENDOR] && <Col sm={6} md={4}>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_START}
          label="Project Start Date (Vendors Only)"
          type="date"/>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_END}
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

FormMain.propTypes = {
  user: PropTypes.object.isRequired,
  justifications: PropTypes.object.isRequired
};

export default FormMain;
