import React from 'react';

import AnswerForm from '../../components/question/AnswerForm';
import AnswerList from '../../components/question/AnswerList';

const DUMMY_QUESTION = {
  id: 2,
  title: 'python이 뭐예요?',
  author: '자린이',
  content: '오늘 파이썬 처음 들어봤어요.',
  comments: [
    {
      id: 1,
      author: '파프로',
      content: '공식문서 찾아보세요',
      review: '\`\`\`js\nconsole.log(123)\n\`\`\`',
    },
    {
      id: 2,
      author: '파파프로',
      content: '뱀 이름 이예요',
      review: '```js\nconsole.log(456)\n```',
    },
  ],
  createdAt: '2022-08-01',
  updatedAt: '2022-08-02',
};

const QuestionDetailPage = () => {
  return (
    <>
      <section>
        <h3>{DUMMY_QUESTION.title}</h3>
        <span>
          {`${DUMMY_QUESTION.createdAt} ${DUMMY_QUESTION.createdAt !== DUMMY_QUESTION.updatedAt ? '(수정됨)' : ''}`}
        </span>
        <p>{DUMMY_QUESTION.content}</p>
        <div>
          <button type="submit">삭제하기</button>
          <button type="button">수정하기</button>
        </div>
      </section>
      <section>
        <AnswerForm content={DUMMY_QUESTION.content} />
        <AnswerList comments={DUMMY_QUESTION.comments} />
      </section>
    </>
  );
};

export default QuestionDetailPage;
