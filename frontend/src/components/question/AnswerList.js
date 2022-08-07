import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAnswerList, getAnswers } from '../../store/answerSlice';
import AnswerListItem from './AnswerListItem';
import classes from './QuestionList.module.css';

const AnswerList = ({ originalCode }) => {
  const dispatch = useDispatch();
  const answers = useSelector(getAnswers);
  const { questionId } = useParams();

  useEffect(() => {
    dispatch(fetchAnswerList({ questionId }));
  }, []);

  return (
    <div className={classes.answer__list}>
      {answers.map((answer) => (
        <AnswerListItem
          key={answer.answerId}
          answerId={answer.answerId}
          questionId={answer.questionId}
          roomId={answer.roomId}
          writer={answer.answerWriterEmail}
          content={answer.content}
          review={answer.code || ''}
          language={answer.language}
          createdAt={answer.create_datetime}
          originalCode={originalCode}
        />
      ))}
    </div>
  );
};

AnswerList.propTypes = {
  originalCode: PropTypes.string.isRequired,
};

export default AnswerList;
