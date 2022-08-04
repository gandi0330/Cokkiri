import React from 'react';
import PropTypes from 'prop-types';

import Markdown from './Markdown';
import classes from './QuestionList.module.css';

const AnswerListItem = ({
  writer, content, review,
}) => {
  return (
    <div className={classes.answer__item}>
      <div>
        <span>{writer}</span>
        <div className={classes.answer__item__btn}>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
      <p>{content}</p>
      <Markdown review={review} />
    </div>
  );
};

AnswerListItem.propTypes = {
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default AnswerListItem;
