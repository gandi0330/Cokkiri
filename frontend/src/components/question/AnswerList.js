import React from 'react';
import PropTypes from 'prop-types';

import AnswerListItem from './AnswerListItem';
import classes from './QuestionList.module.css';

const AnswerList = ({ comments, originalCode }) => {
  return (
    <div className={classes.answer__list}>
      {comments.map((comment) => (
        <AnswerListItem
          key={comment.id}
          id={comment.id}
          writer={comment.writer}
          content={comment.content}
          review={comment.review}
          originalCode={originalCode}
        />
      ))}
    </div>
  );
};

AnswerList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      writer: PropTypes.string,
      content: PropTypes.string,
      review: PropTypes.string,
    }),
  ).isRequired,
  originalCode: PropTypes.string.isRequired,
};

export default AnswerList;
