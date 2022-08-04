import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import QuestionList from '../../components/question/QuestionList';
import ExcitingElephant from '../../components/icons/ExcitingElephant';
import classes from './QuestionPage.module.css';

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
    content: `항상 당연하게 create react app을 사용해서 react를 시작했는데, 오늘 보니 cra 안 하고 npm init부터 시작하시는 분들이 있더라구요. 
    언제 cra를 사용하는 거죠? 아무리해봐도 모르겠어요 ㅠㅠ 제가 리액트를 잘 하게 되는 날이 올까요? 너무 힘들어요.ㅠㅠㅠㅠㅠㅠㅠㅠㅠ`,
    comments: [{ id: 1, author: '리프로', content: '공식문서 찾아보세요' }],
    createdAt: '2022-07-01',
    updatedAt: '2022-07-03',
  },
];

const QuestionPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); 
  return (
    <div className={classes.questions}>
      <header>
        <ExcitingElephant />
        <h3>질문 게시판</h3>
      </header>
      <button type="button" onClick={() => navigate(`/room/${roomId}/questions/new`)}>
        + 질문 작성하기
      </button>
      <QuestionList questions={DUMMY_QUESTIONS} />
    </div>
  );
};

export default QuestionPage;
