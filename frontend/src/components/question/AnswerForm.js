import { useState } from 'react';
import PropTypes from 'prop-types';

import CodeReview from './CodeReview';

const AnswerForm = ({ content }) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const oldCodes = content.match(/```[a-z]*\n[\s\S]*?\n```/g) || [];

  return (
    <form>
      <div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          name="answer-input"
          id="answer-input"
          cols="30"
          rows="10"
        />
        <button type="submit">답글 달기</button>
        <button type="button" onClick={() => setReviewOpen((prev) => !prev)}>
          코드 리뷰
        </button>
      </div>
      {/* TODO 나중에 code snippet 여러 개 기능 추가를 위해 아래와 같이 작성 */}
      {reviewOpen 
        && [oldCodes[0]].map((old, idx) => (
          <CodeReview
            key={`code-${idx * 1}`}
            oldCode={old.slice(old.indexOf('\n') + 1, old.lastIndexOf('\n'))}
            language={old.slice(3, old.indexOf('\n')) || ''}
          />
        ))}
    </form>
  );
};

AnswerForm.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AnswerForm;
