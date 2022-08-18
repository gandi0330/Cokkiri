import React, { useState } from 'react';
import QuestionPage from './QuestionPage';
import QuestionNewPage from './QuestionNewPage';
import QuestionUpdatePage from './QuestionUpdatePage';
import QuestionDetailPage from './QuestionDetailPage';

const Questions = () => {
  const [questionRoute, setQuestionRoute] = useState('main');
  const [questionId, setQuestionId] = useState(0);

  if (questionRoute === 'main') {
    return <QuestionPage setQuestionRoute={setQuestionRoute} setQuestionId={setQuestionId} />;
  }

  if (questionRoute === 'new') {
    return <QuestionNewPage setQuestionRoute={setQuestionRoute} questionId={questionId} />;
  }

  if (questionRoute === 'update') {
    return <QuestionUpdatePage setQuestionRoute={setQuestionRoute} questionId={questionId} />;
  }

  if (questionRoute === 'detail') {
    return <QuestionDetailPage setQuestionRoute={setQuestionRoute} questionId={questionId} />;
  }
};

export default Questions;
