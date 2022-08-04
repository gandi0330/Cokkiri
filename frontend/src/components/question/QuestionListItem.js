import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './QuestionList.module.css';

const QuestionListItem = ({
  id, title, writer, content, createdAt,
}) => {
  const { roomId } = useParams();
  return (
    <Link to={`/room/${roomId}/question/${id}`} className={classes.questions__item}>
      <h4>{title}</h4>
      <p>{content.length < 100 ? content : `${content.slice(0, 100)}...`}</p>
      <div className={classes.questions__extra}>
        <span>
          {`${writer} | ${createdAt}`}
        </span>
        <span>
          답변: 0개
        </span>
      </div>
    </Link>
  );
};

QuestionListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default QuestionListItem;
