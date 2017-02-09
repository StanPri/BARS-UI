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
 * @return {JSX}
 */
const FormMain = ({
  formMainNameHandleInput,
  formMainNamehidden,
  formMainNames,
  formMainNamesOnClick,
  auth,
  justifications,
  disabled
}) => (
  <div>
    <Row>
      <Col xs={12}>
        <h2>
          Applicant Information
          <Button><Glyphicon glyph="question-sign"/></Button>
        </h2>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInputAuto}
          data={formMainNames}
          onInput={formMainNameHandleInput}
          onNameClick={formMainNamesOnClick}
          name={KEYS.FORM_NAME}
          isHidden={formMainNamehidden}
          label="Name"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_COMPANY}
          label="Company Name"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_REQUEST_DATE}
          label="Request Date"
          type="date"
          disabled={disabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_PHONE}
          label="Work Phone"
          type="tel"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_COMPANY_ADDRESS}
          label="Company Address"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_NAME}
          label="Supervisor Name"
          disabled={disabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_CELL}
          label="Cell Phone"
          type="tel"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_DIVISION}
          label="Division"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_SUP_PHONE}
          label="Supervisor Phone"
          type="tel"
          disabled={disabled}/>
      </Col>
      <Col sm={6} md={3}>
        <Field
          component={FormInput}
          name={KEYS.FORM_LICENSE}
          label="License Plate"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_UNIT}
          label="Unit/Project"
          disabled={disabled}/>
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
          options={['Reason1', 'Reason2', 'Reason3']}
          disabled={disabled}/>
        <Field
          component={FormSelect}
          name={KEYS.FORM_HOURS}
          label="Hours"
          options={['Hours1', 'Hours2', 'Hours3']}
          disabled={disabled}/>
      </Col>
      <Col sm={6} md={4}>
        <Field
          component={FormSelect}
          name={KEYS.FORM_AREAS}
          label="Areas"
          options={['Area1', 'Area2', 'Area3']}
          multiple
          disabled={disabled}/>
        {justifications.fields[KEYS.JUSTIFICATIONS_OTHER] &&
        <Field
          component={FormInput}
          name={KEYS.FORM_AREA_OTHER}
          label="Other Area"
          disabled={disabled}/>}
      </Col>

      <Col sm={6} md={4}>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_START}
          label="Project Start Date (Vendors Only)"
          type="date"
          disabled={disabled}/>
        <Field
          component={FormInput}
          name={KEYS.FORM_VENDOR_END}
          label="Project End Date (Vendors Only)"
          type="date"
          disabled={disabled}/>
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
  disabled: PropTypes.bool.isRequired
};

export default FormMain;
