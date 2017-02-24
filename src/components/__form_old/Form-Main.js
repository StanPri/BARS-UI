import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import FormInput from '../common/FormInput';
import FormInputAuto from '../common/FormInputAuto';
import FormSelect from '../common/FormSelect';
import FormJustifications from './Form-Justifications';
import * as KEYS from '../../store/keyMap';

/**
 * TODO: handle help info (remove buttons? popup, tooltip?)
 * Main form section for new or exisiting badge requests
 * @param {func} formMainNameHandleInput  - handles input into name field, populates list from employee directory
 * @param {bool} formMainNamehidden       - toggle if list of names hidden
 * @param {object} formMainNames          - employee directory data
 * @param {func} formMainNamesOnClick     - handles clicking on entry in list of names
 * @param {object} user                   - information about the user
 * @param {object} justifications         - holds which justifications are needed
 * @param {bool} disabledState                 - if field should be disabled (works with disabledFields)
 * @param {array} disabledFields                - list of fields that sho9uld be editable (works with disabledState)
 * @return {JSX}
 */
const FormMain = ({
  formMainNameHandleInput,
  formMainNamehidden,
  formMainNames,
  formMainNamesOnClick,
  auth,
  justifications,
  disabledState,
  editableFields
}) => (
  <div>
    <Row>
      <Col xs={12} sm={9}>
        <h2>
          Applicant Information
        </h2>
      </Col>
      <Col xs={12} sm={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_REQUEST_DATE}
          label="Date Created"
          type="date"
          disabled={true}/>
      </Col>
    </Row>
    <Row>
      <Col sm={6} md={3}>
        <Field
          component={FormInputAuto}
          data={formMainNames}
          onInput={formMainNameHandleInput}
          onNameClick={formMainNamesOnClick}
          name={KEYS.FORM_NAME}
          isHidden={formMainNamehidden}
          label="Name"
          disabled={disabledState}/>
      </Col>
      {console.log("IN MAIN FORM: form_email disabled:", editableFields, KEYS.FORM_CELL)}
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_EMAIL}
          label="Email"
          type="email"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_EMAIL)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_PHONE}
          label="Work Phone"
          type="tel"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_PHONE)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_CELL}
          label="Cell Phone"
          type="tel"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CELL)}/>
      </Col>
    </Row>
    <Row>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_LICENSE}
          label="License Plate"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_COMPANY}
          label="Company Name"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_COMPANY_ADDRESS}
          label="Company Address"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_DIVISION}
          label="Division"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
    </Row>
    <Row>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_UNIT}
          label="Unit/Project"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_NAME}
          label="Supervisor Name"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_SUP_NAME)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_EMAIL}
          label="Supervisor Email"
          type="tel"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_SUP_EMAIL)}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_PHONE}
          label="Supervisor Phone"
          type="tel"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_SUP_PHONE)}/>
      </Col>
    </Row>

    <Row>
      <Col xs={12}>
        <h2>
          Access Requirements
        </h2>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name={KEYS.FORM_REASON}
          label="Reason"
          options={['Reason1', 'Reason2', 'Reason3']}
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
        <Field
          component={FormSelect}
          name={KEYS.FORM_HOURS}
          label="Hours"
          options={['Hours1', 'Hours2', 'Hours3']}
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name={KEYS.FORM_AREAS}
          label="Areas"
          options={['Area1', 'Area2', 'Area3']}
          multiple
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/> {justifications.fields[KEYS.JUSTIFICATIONS_OTHER] && <Field
          component={FormInput}
          name={KEYS.FORM_AREA_OTHER}
          label="Other Area"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>}
      </Col>

      <Col sm={6} md={4}>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_START}
          label="Project Start Date (Vendors Only)"
          type="date"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_END}
          label="Project End Date (Vendors Only)"
          type="date"
          disabled={disabledState || !editableFields.includes(KEYS.FORM_CAN_EDIT)}/>
      </Col>

      <Col xs={12}>
        <span className="pull-right">Fields marked with an asterik (*) require an
          explanation in the Justifications section</span>
      </Col>
    </Row>
    {justifications.display && <FormJustifications/>}
  </div>
);

FormMain.propTypes = {
  formMainNameHandleInput: PropTypes.func.isRequired,
  formMainNamehidden: PropTypes.bool.isRequired,
  formMainNames: PropTypes.object.isRequired,
  formMainNamesOnClick: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  justifications: PropTypes.object.isRequired,
  disabledState: PropTypes.bool.isRequired,
  editableFields: PropTypes.array.isRequired
};

export default FormMain;
