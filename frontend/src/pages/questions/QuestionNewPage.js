import React from 'react';
import PropTypes from 'prop-types';

import QuestionForm from '../../components/question/QuestionForm';
import QuestionHeader from '../../components/question/QuestionHeader';
import classes from './QuestionPage.module.css';

const QuestionNewPage = ({ setQuestionRoute, questionId }) => {
  return (
    <div className={classes.questions}>
      <QuestionHeader headerTitle="질문 작성하기" />
      <QuestionForm 
        type="작성" 
        qTitle="" 
        qContent="" 
        qCode="" 
        setQuestionRoute={setQuestionRoute} 
        questionId={questionId}
      />
    </div>
  );
};

QuestionNewPage.propTypes = {
  setQuestionRoute: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuestionNewPage;
