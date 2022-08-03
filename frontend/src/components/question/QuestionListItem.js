import React from 'react';
import { Link, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

const QuestionListItem = ({
  id, title, author, content, createdAt, updatedAt,
}) => {
  const { roomId } = useParams();
  return (
    <Link to={`/room/${roomId}/question/${id}`}>
      <h4>{title}</h4>
      <span>{author}</span>
      <p>{content}</p>
      <span>{`${createdAt} ${createdAt !== updatedAt ? '(수정됨)' : ''}`}</span>
      <hr />
    </Link>
  );
};

QuestionListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default QuestionListItem;
