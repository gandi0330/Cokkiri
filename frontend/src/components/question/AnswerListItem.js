import React from 'react';
import PropTypes from 'prop-types';

import Markdown from './Markdown';

const AnswerListItem = ({
  author, content, review,
}) => {
  console.log(review);
  return (
    <div>
      <span>{author}</span>
      <p>{content}</p>
      <Markdown review={review} />
    </div>
  );
};

AnswerListItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default AnswerListItem;
