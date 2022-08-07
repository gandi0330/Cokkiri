import React from 'react';

import classes from './QuestionListLoader.module.css';

const QuestionListLoaderItem = () => {
  return (
    <>
      <div className={classes.questionList__loader__title} />
      <div className={classes.questionList__loader__content} />
      <div className={classes.questionList__loader__writer} />
      <span />
    </>
  );
};

const QuestionListLoader = () => {
  return (
    <div className={classes.questionList__loader}>
      <QuestionListLoaderItem />
      <QuestionListLoaderItem />
      <QuestionListLoaderItem />
      <QuestionListLoaderItem />
    </div>
  );
};

export default QuestionListLoader;
