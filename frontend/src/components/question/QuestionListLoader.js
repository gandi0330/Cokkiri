import React from 'react';

import classes from './QuestionListLoader.module.css';

const QuestionListLoader = () => {
  return (
    <div className={classes.questionList__loader}>
      <div className={classes.questionList__loader__title} />
      <div className={classes.questionList__loader__content} />
      <div className={classes.questionList__loader__writer} />
      <span />
      <div className={classes.questionList__loader__title} />
      <div className={classes.questionList__loader__content} />
      <div className={classes.questionList__loader__writer} />
      <span />
      <div className={classes.questionList__loader__title} />
      <div className={classes.questionList__loader__content} />
      <div className={classes.questionList__loader__writer} />
      <span />
      <div className={classes.questionList__loader__title} />
      <div className={classes.questionList__loader__content} />
      <div className={classes.questionList__loader__writer} />
      <span />
    </div>
  );
};

export default QuestionListLoader;
