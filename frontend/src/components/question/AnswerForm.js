import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createAnswer, fetchAnswerList, updateAnswer } from '../../store/answerSlice';
import { getUserEmail } from '../../store/authSlice';

import CodeReview from './CodeReview';
import YesNoModal from '../layout/YesNoModal';
import classes from './QuestionList.module.css';

const AnswerForm = ({ 
  type, prevAnswer, prevReview, code, language, answerId,
}) => {
  const dispatch = useDispatch();
  const { roomId, questionId } = useParams();
  const email = useSelector(getUserEmail);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [review, setReview] = useState('');
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  // const oldCodes = code.match(/```[a-z]*\n[\s\S]*?\n```/g) || [];

  const submitHanlder = (event) => {
    event.preventDefault();
    setAnswerModalOpen(true);
  };

  const sendAnswerHandler = () => {
    setAnswerModalOpen(false);
    
    if (type === 'create') {
      dispatch(createAnswer({
        questionId, 
        roomId, 
        email,
        content: answer,
        language,
        code: !code ? null : review,
      }))
        .unwrap()
        .then(() => {
          dispatch(fetchAnswerList({ questionId }));
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setAnswer('');
          setReview('');
          setReviewOpen(false);
        });
    }

    if (type === 'edit') {
      if (answerId === -1) return;

      dispatch(updateAnswer({
        answerId, 
        email,
        content: answer,
        language,
        code: review,
      }))
        .unwrap()
        .then(() => {
          dispatch(fetchAnswerList({ questionId }));
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setAnswer('');
          setReview('');
          setReviewOpen(false);
        });
    }
  };

  // console.log(prevAnswer, prevReview);

  useEffect(() => {
    setAnswer(prevAnswer);
    setReview(prevReview);
  }, []);

  return (
    <>
      <YesNoModal 
        yes={type === 'create' ? '답글달기' : '수정하기'} 
        no="취소하기" 
        open={answerModalOpen} 
        onClose={() => setAnswerModalOpen(false)}
        onNoClick={() => setAnswerModalOpen(false)}
        onYesClick={sendAnswerHandler}
      >
        <p>{type === 'create' ? '답글을 다시겠습니까?' : '답글을 수정하시겠습니까?'}</p>
      </YesNoModal>
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
        {code && (
          <button 
            type="button" 
            className="question__btn" 
            onClick={() => setReviewOpen((prev) => !prev)}
          >
            {!reviewOpen ? '+ 코드 리뷰' : '- 코드 리뷰 닫기'}
          </button>
        )}
        {reviewOpen && (
          <CodeReview 
            type={type}
            language={language}
            oldCode={code}
            prevReview={prevReview || ''}
            setReview={setReview}
          />
        )}
        <button type="submit" className={classes.question__answerbtn}>
          {type === 'create' ? '답글 달기' : '수정하기'}
        </button>
      </form>
    </>
  );
};

AnswerForm.propTypes = {
  type: PropTypes.string.isRequired,
  prevAnswer: PropTypes.string.isRequired,
  prevReview: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  answerId: PropTypes.number.isRequired,
};

export default AnswerForm;
