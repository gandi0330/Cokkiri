import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import QuestionList from '../../components/question/QuestionList';

const DUMMY_QUESTIONS = [
  {
    id: 1,
    title: 'tomkat이 뭐예요?',
    author: '자린이',
    content: '오늘 처음 들어봤어요.',
    comments: [{ id: 1, author: '자프로', content: '공식문서 찾아보세요' }],
    createdAt: '2022-08-03',
    updatedAt: '2022-08-03',
  },
  {
    id: 2,
    title: 'python이 뭐예요?',
    author: '자린이',
    content: '오늘 파이썬 처음 들어봤어요.',
    comments: [{ id: 1, author: '파프로', content: '공식문서 찾아보세요' }, { id: 2, author: '파파프로', content: '뱀 이름 이예요' }],
    createdAt: '2022-08-01',
    updatedAt: '2022-08-02',
  },
  {
    id: 3,
    title: 'react가 뭐예요?',
    author: '리린이',
    content: '자바스크립트만 들어봤어요.',
    comments: [{ id: 1, author: '리프로', content: '공식문서 찾아보세요' }],
    createdAt: '2022-07-01',
    updatedAt: '2022-07-03',
  },
];

const QuestionPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); 
  return (
    <div>
      QuestionPage
      <QuestionList questions={DUMMY_QUESTIONS} />
      <button type="button" onClick={() => navigate(`/room/${roomId}/questions/new`)}>질문하기</button>
    </div>
  );
};

export default QuestionPage;
