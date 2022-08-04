import React from 'react';

import QuestionForm from '../../components/question/QuestionForm';
import QuestionHeader from '../../components/question/QuestionHeader';
import classes from './QuestionPage.module.css';

const QuestionNewPage = () => {
  return (
    <div className={classes.questions}>
      <QuestionHeader headerTitle="질문 작성하기" />
      <QuestionForm type="작성" qTitle="" qContent="" qCode="" />
    </div>
  );
};

export default QuestionNewPage;
