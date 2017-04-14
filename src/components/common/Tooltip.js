/**
 * Tooltip.js
 * renders a tooltip
 */
import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import tooltips from '../../containers/form/tooltips';

const Tooltip = ({text, required, tooltipName}) => (
  <span data-tip={tooltipName
    ? tooltips[tooltipName]
    : ""}>
    {text}
    {required && <span className="required-text"> (required)</span>}
    {tooltipName && <span>
      <Glyphicon glyph="question-sign"/>
      <ReactTooltip effect="solid"/>
    </span>}
  </span>
);

export default Tooltip;
