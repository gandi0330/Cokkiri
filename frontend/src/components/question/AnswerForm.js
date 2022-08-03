import { useState } from 'react';
import PropTypes from 'prop-types';

import CodeReview from './CodeReview';

const AnswerForm = ({
  content,
}) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [answer, setAnswer] = useState('');

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
        <button type="button" onClick={() => setReviewOpen((prev) => !prev)}>
          코드 리뷰
        </button>
      </div>
      {reviewOpen && <CodeReview content={content} />}
    </form>
  );
};

AnswerForm.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AnswerForm;
