import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toggle.module.css';

const Toggle = ({ onToggle, tgId, tgHtmlFor }) => {
  return (
    <label className={classes.toggle} htmlFor={tgHtmlFor}>
      <input type="checkbox" id={tgId} onChange={onToggle} />
      <span className={classes.slider} />
    </label>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  tgId: PropTypes.string.isRequired,
  tgHtmlFor: PropTypes.string.isRequired,
};

export default Toggle;
