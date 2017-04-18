// libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Row, Col} from 'react-bootstrap';
// compnents
import FieldInput from '../common/FieldInput';
import DatePicker from '../common/FieldDate';
// constants, actions, etc
import * as KEYS from '../../store/keyMap';

/**
 * Displays approval of terms and conditions for recipient in form
 * @param {string}  label           - name user must match to confirm
 * @param {string}  name            - field name
 * @param {bool}    allDisabled     - toggles disabling all fields
 */
const FormTermsRecipient = ({label, name, allDisabled}) => {
  let widthSm = allDisabled
    ? 6
    : 12;
  let widthMd = allDisabled
    ? 9
    : 12;
  return (
    <div>
      <Row>
        <Col sm={12}>
          {!allDisabled && <div>
            <p>By entering your name exactly as it appears below you
              agree to the following terms and conditions:</p>
            <ol>
              <li>Badge must be visible at all times and worn on outer most garment.</li>
              <li>Card readers must be badged before entering a secured area.</li>
              <li>No badge sharing among staff or visitors.</li>
              <li>Inform physical security (228-6424) should badges be lost or found.</li>
            </ol>
            <p>For more information please refer to <a href="http://icentral.technology.ca.gov/campus-facilities/building-security/identification-badges/">ID Badge Regulations</a>.</p>
          </div>}
        </Col>
      </Row>
      <Row>
        <Col sm={widthSm} md={widthMd}>
          <Field
            label={label}
            name={name}
            disabled={allDisabled}
            component={FieldInput}
            type="text"
            required={!allDisabled}/>
        </Col>
        {allDisabled && <Col sm={6} md={3}>
          <Field
            label="Approval Date"
            name={KEYS.FORM_APPROVAL_DATE_SUP}
            disabled={allDisabled}
            component={DatePicker}/>
        </Col>}
      </Row>
    </div>
  );
};

FormTermsRecipient.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  allDisabled: PropTypes.bool
}

export default FormTermsRecipient;
