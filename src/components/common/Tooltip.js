/**
 * Tooltip.js
 * renders a tooltip
 */
import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import tooltips from '';

const Tooltip = ({text, required, displayTooltip}) => (
  <span data-tip={displayTooltip
    ?
    : ""}>
    {text}
    {required && <span className="required-text"> (required)</span>}
    {displayTooltip && <span> <Glyphicon glyph="question-sign"/><ReactTooltip/></span>}
  </span>
);

export default Tooltip;
