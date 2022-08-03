import React from 'react';
import PropTypes from 'prop-types';

import AnswerListItem from './AnswerListItem';

const AnswerList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <AnswerListItem
          key={comment.id}
          id={comment.id}
          author={comment.author}
          content={comment.content}
          review={comment.review}
        />
      ))}
    </div>
  );
};

AnswerList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      content: PropTypes.string,
      review: PropTypes.string,
    }),
  ).isRequired,
};

export default AnswerList;
