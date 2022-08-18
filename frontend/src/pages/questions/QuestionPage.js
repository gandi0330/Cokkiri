import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate, useParams } from 'react-router-dom';

import QuestionList from '../../components/question/QuestionList';
import QuestionHeader from '../../components/question/QuestionHeader';
import classes from './QuestionPage.module.css';

const QuestionPage = ({ setQuestionRoute, setQuestionId }) => {
  // const navigate = useNavigate();
  // const { roomId } = useParams(); 
  return (
    <div className={classes.questions}>
      <QuestionHeader headerTitle="질문 게시판" />
      <button 
        type="button" 
        // onClick={() => navigate(`/room/${roomId}/questions/new`)}
        onClick={() => setQuestionRoute('new')}
        className="question__btn"
      >
        + 질문 작성하기
      </button>
      <QuestionList setQuestionId={setQuestionId} setQuestionRoute={setQuestionRoute} />
    </div>
  );
};

QuestionPage.propTypes = {
  setQuestionRoute: PropTypes.func.isRequired,
  setQuestionId: PropTypes.func.isRequired,
};

export default QuestionPage;
