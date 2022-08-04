import { useState } from 'react';
import PropTypes from 'prop-types';

import CodeReview from './CodeReview';
import classes from './QuestionList.module.css';

const AnswerForm = ({ code }) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [review, setReview] = useState('');
  // const oldCodes = code.match(/```[a-z]*\n[\s\S]*?\n```/g) || [];

  const submitHanlder = (event) => {
    event.preventDefault();
    console.log(review);
    // axios
  };

  return (
    <form
      onSubmit={submitHanlder} 
      className={`${classes.question__form} ${classes.question__answerForm}`}
    >
      <textarea
        id="answer-input"
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        rows="5"
      />
      <button 
        type="button" 
        className="question__btn" 
        onClick={() => setReviewOpen((prev) => !prev)}
      >
        {!reviewOpen ? '+ 코드 리뷰' : '- 코드 리뷰 닫기'}
      </button>
      {reviewOpen && (
        <CodeReview 
          language="js"
          oldCode={code}
          setReview={setReview}
        />
      )}
      <button type="submit" className={classes.question__answerbtn}>답글 달기</button>
      {/* {reviewOpen 
        && [oldCodes[0]].map((old, idx) => (
          <CodeReview
            key={`code-${idx * 1}`}
            oldCode={old.slice(old.indexOf('\n') + 1, old.lastIndexOf('\n'))}
            language={old.slice(3, old.indexOf('\n')) || ''}
          />
        ))} */}
    </form>
  );
};

AnswerForm.propTypes = {
  code: PropTypes.string.isRequired,
};

export default AnswerForm;
