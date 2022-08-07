import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import QuestionList from '../../components/question/QuestionList';
import QuestionHeader from '../../components/question/QuestionHeader';
import Footer from '../../components/layout/Footer';
import classes from './QuestionPage.module.css';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); 
  return (
    <>
      <div className={classes.questions}>
        <QuestionHeader headerTitle="질문 게시판" />
        <button 
          type="button" 
          onClick={() => navigate(`/room/${roomId}/questions/new`)}
          className="question__btn"
        >
          + 질문 작성하기
        </button>
        <QuestionList />
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
