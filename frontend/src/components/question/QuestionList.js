import React from 'react';

import PropTypes from 'prop-types';
import QuestionListItem from './QuestionListItem';

import classes from './QuestionList.module.css';

const QuestionList = ({ questions }) => {
  return (
    <div className={classes.questions__list}>
      {questions.map((question) => (
        <QuestionListItem
          key={question.id}
          id={question.id}
          title={question.title}
          author={question.author}
          content={question.content}
          createdAt={question.createdAt}
          updatedAt={question.updatedAt}
        />
      ))}
    </div>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    contents: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      contents: PropTypes.string,
    })),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })).isRequired,
};

export default QuestionList;
