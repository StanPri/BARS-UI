// imported libraries
import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {Col} from 'react-bootstrap';
// common compnents
import FieldInput from '../common/FieldInput';
import NameList from '../common/NameList';
import * as KEYS from '../../store/keyMap';
import FieldRadioGroup from '../common/FieldRadioGroup';

/**
 * Renders approver information section of form
 * @param {object}  approverNames          - list of names to display
 * @param {object}  fieldsDisabled         - determines which fields should be disabled
 * @param {bool}    allDisabled            - determines if all fields should be disabled
 * @param {bool}    singleLine             - determines if fields should render in a single line
 * @param {array}   options                - names of recipient's managers in format [{name:'name'}, ...]
 */
const WizardMainApprover = ({
  approverNames,
  fieldsDisabled,
  allDisabled,
  singleLine,
  options
}) => {
  let width = singleLine
    ? 3
    : 6;
  let offset = singleLine
    ? 0
    : 3;
  return (
    <div>
        <Col sm={width} smOffset={offset}>
          <Field
            label="Select the approving manager"
            name={KEYS.FORM_SUP_NAME}
            disabled={allDisabled}
            options={options}
            component={FieldRadioGroup}
            required={!allDisabled}/>
        </Col>
    </div>
  );
};

WizardMainApprover.propTypes = {
  approverNames: PropTypes.object,
  fieldsDisabled: PropTypes.object,
  allDisabled: PropTypes.bool,
  singleLine: PropTypes.bool
};

export default WizardMainApprover;
