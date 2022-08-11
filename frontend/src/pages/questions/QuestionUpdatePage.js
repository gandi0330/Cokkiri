import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionDetail, getQuestion } from '../../store/questionSlice';

import QuestionForm from '../../components/question/QuestionForm';
import QuestionHeader from '../../components/question/QuestionHeader';
import classes from './QuestionPage.module.css';

const QuestionUpdatePage = ({
  questionId, setQuestionRoute,
}) => {
  const dispatch = useDispatch();
  // const { questionId } = useParams(); 
  const question = useSelector(getQuestion);

  useEffect(() => {
    dispatch(fetchQuestionDetail({ questionId }))
      .unwrap()
      .then()
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.questions}>
      <QuestionHeader headerTitle="질문 수정하기" />
      <QuestionForm 
        type="수정" 
        qTitle={question.title || ''} 
        qContent={question.content || ''} 
        qCode={question.code || ''}
        setQuestionRoute={setQuestionRoute}
        questionId={questionId}
      />
    </div>
  );
};

QuestionUpdatePage.propTypes = {
  questionId: PropTypes.number.isRequired,
  setQuestionRoute: PropTypes.func.isRequired,
};

export default QuestionUpdatePage;
