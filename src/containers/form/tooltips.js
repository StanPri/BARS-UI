/******************************************
 *  containers/form/tooltips.js
 *
 *  contains all tooltip text
 * ***************************************/
import * as KEYS from '../../store/keyMap';

export default {
  [KEYS.FORM_NAME]: "Enter the recipients name. You may only submit requests for members of your group.",
  [KEYS.FORM_REASON]: "Select the reason for a new badge.<br>Reasons with an asterik(*) require a justification in the next section.",
  [KEYS.FORM_AREAS]: "Select the areas you need access granted.<br>Areas with an asterik(*) require a justification in the next section.",
  [KEYS.FORM_HOURS]: "Select hours of the week that access will be needed.<br>Hours with an asterik(*) require a justification in the next section.",
  [KEYS.FORM_REJECT_REASON]: "Enter the reason for rejecting this request."
};
