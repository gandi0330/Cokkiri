import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions, fetchQuestionList } from '../../store/questionSlice';

import QuestionListLoader from './QuestionListLoader';
import QuestionListItem from './QuestionListItem';
import SadElephant from '../../images/SadElephant.png';

import classes from './QuestionList.module.css';

const QuestionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector(getQuestions);
  const loading = useSelector((state) => state.question.loading);
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(fetchQuestionList({ roomId }))
      .unwrap()
      .then()
      .catch((err) => {
        if (err.statusCode === 404) {
          navigate('/rooms');
        }
        console.error(err);
      });
  }, []);

  const sortedQuestions = useMemo(() => {
    const tmpQuestions = [...questions];
    tmpQuestions.sort((a, b) => (b.questionId - a.questionId));
    return tmpQuestions;
  }, [questions]);
  
  return (
    <>
      {loading && <QuestionListLoader />}
      {!loading && questions?.length > 0 && (
        <div className={classes.questions__list}>
          {sortedQuestions.map((question) => (
            <QuestionListItem
              key={question.questionId}
              questionId={question.questionId}
              title={question.title}
              writer={question.questionWriterEmail}
              content={question.content}
              createdAt={question.createDateTime}
            />
          ))}
        </div>
      )}
      {!loading && questions?.length === 0 && (
        <div className={classes.questions__nothing}>
          <img src={SadElephant} alt="질문 검색 결과 없어서 우는 코끼리" />
          <p>질문이 하나도 없어요!</p>
          <p>새로 작성해 볼까요?</p>
        </div>
      )}
    </>
  );
};

export default QuestionList;
