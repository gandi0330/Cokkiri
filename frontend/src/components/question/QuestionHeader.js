import React from 'react';
import PropTypes from 'prop-types';

import classes from './QuestionList.module.css';
import ExcitingElephant from '../icons/ExcitingElephant';

const QuestionHeader = ({
  headerTitle,
}) => {
  return (
    <header id="question-header" className={classes.header}>
      <ExcitingElephant />
      <h3>{headerTitle}</h3>
    </header>
  );
};

QuestionHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
};

export default QuestionHeader;
