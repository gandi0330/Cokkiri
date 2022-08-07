import React from 'react';

import classes from './QuestionLoader.module.css';

const QuestionLoader = () => {
  return (
    <div className={classes.question__loader}>
      <div className={classes.question__loader__header} />
      <div className={classes.question__loader__writer} />
      <span />
      <div className={classes.question__loader__content} />
      <span />
      <div className={classes.question__loader__answer} />
      <div className={classes.question__loader__writer} />
      <span />
    </div>
  );
};

export default QuestionLoader;
