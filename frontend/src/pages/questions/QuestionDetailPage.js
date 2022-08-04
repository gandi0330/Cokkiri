import React, { useState } from 'react';

import AnswerForm from '../../components/question/AnswerForm';
import AnswerList from '../../components/question/AnswerList';
import Markdown from '../../components/question/Markdown';
import Modal from '../../components/layout/Modal';
import SadElephant from '../../components/icons/SadElephant';
import Footer from '../../components/layout/Footer';

import classes from './QuestionPage.module.css';

const DUMMY_QUESTION = {
  id: 2,
  title: 'python이 뭐예요?',
  writer: '자린이',
  content: 
    '오늘 파이썬 처음 들어봤어요.',
  code: '```js\nconsole.log(123);\n```',
  comments: [
    {
      id: 1,
      writer: '파프로',
      content: '공식문서 찾아보세요',
      review: '```js\nconsole.log(123)\n```',
    },
    {
      id: 2,
      writer: '파파프로',
      content: '뱀 이름 이예요',
      review: '```js\nconsole.log(456)\n```',
    },
  ],
  createdAt: '2022-08-01',
  updatedAt: '2022-08-02',
};

const QuestionDetailPage = () => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const removeHandler = (event) => {
    event.preventDafault();
  };

  return (
    <>
      <Modal open={removeModalOpen} onClose={() => setRemoveModalOpen(false)}>
        <div className={classes.question__remove}>
          <SadElephant />
          <div>
            <p>정말 삭제하시겠어요?</p>
          </div>
          <div>
            <button type="submit" onClick={removeHandler}>
              삭제하기
            </button>
            <button type="button" onClick={() => setRemoveModalOpen(false)}>
              취소하기
            </button>
          </div>
        </div>
      </Modal>
      <div className={classes.detail}>
        <header>
          <h3>{`Q. ${DUMMY_QUESTION.title}`}</h3>
          <span>
            {`${DUMMY_QUESTION.writer} | ${DUMMY_QUESTION.createdAt} ${
              DUMMY_QUESTION.createdAt !== DUMMY_QUESTION.updatedAt
                ? '(수정됨)'
                : ''
            }`}
          </span>
        </header>
        <main className={classes.detail__main}>
          <p>{DUMMY_QUESTION.content}</p>
          <Markdown review={DUMMY_QUESTION.code} />
          <div className={classes.detail_btn}>
            <button type="button" onClick={() => setRemoveModalOpen(true)}>삭제</button>
            <button type="button">수정</button>
          </div>
        </main>
        <section className={classes.detail__answer}>
          <AnswerForm code={DUMMY_QUESTION.code} />
          <AnswerList comments={DUMMY_QUESTION.comments} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default QuestionDetailPage;
