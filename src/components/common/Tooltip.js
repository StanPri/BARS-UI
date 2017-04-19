/**
 * Tooltip.js
 * renders a tooltip
 */
import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import tooltips from '../../containers/form/tooltips';

const Tooltip = ({text, required, tooltipName, tooltipVisible}) => {
  let displayTooltip = tooltipVisible && tooltips[tooltipName];
  return (
    <span
      data-tip={displayTooltip
      ? tooltips[tooltipName]
      : ""}>
      {`${text} `}
      {required && <span className="required-text">
        (required) </span>}
      {displayTooltip && <span>
        <Glyphicon glyph="question-sign"/>
        <ReactTooltip place="top" type="dark" effect="float" multiline={true}/>
      </span>}
    </span>
  );
}
export default Tooltip;
