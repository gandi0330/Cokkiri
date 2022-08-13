import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useNavigator, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowLeft as Back } from 'react-icons/md';

import { getUserEmail } from '../../store/authSlice';
import { fetchQuestionDetail, getQuestion, deleteQuestion } from '../../store/questionSlice';
import AnswerForm from '../../components/question/AnswerForm';
import AnswerList from '../../components/question/AnswerList';
import QuestionLoader from '../../components/question/QuestionLoader';
import Markdown from '../../components/question/Markdown';
import YesNoModal from '../../components/layout/YesNoModal';
import SadElephant from '../../components/icons/SadElephant';
// import Footer from '../../components/layout/Footer';

import classes from './QuestionPage.module.css';

const QuestionDetailPage = ({
  questionId, setQuestionRoute,
}) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { roomId } = useParams();
  // const { roomId, questionId } = useParams();
  const question = useSelector(getQuestion);
  const email = useSelector(getUserEmail);
  const loading = useSelector((state) => state.question.loading);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const codeContent = question.code ? '```' + question.language + '\n' + question.code + '\n```' : '';

  useEffect(() => {
    dispatch(fetchQuestionDetail({ questionId }))
      .unwrap()
      .then()
      .catch((err) => {
        if (err.statusCode === 404) {
          // navigate('*');
          // TODO 나중에 처리 필요
          return;
        }

        console.error(err);
      });
  }, []);

  const toUpdatePage = () => {
    // navigate(`/room/${roomId}/question/${questionId}/update`);
    setQuestionRoute('update');
  };

  const removeHandler = () => {
    if (email !== question.questionWriterEmail) return;
    dispatch(deleteQuestion({ questionId, email }))
      .unwrap()
      .then()
      .catch((err) => console.error(err));
    // navigate(`/room/${roomId}/questions`);
    setQuestionRoute('main');
  };

  return (
    <>
      <YesNoModal 
        yes="취소하기" 
        no="삭제하기"
        onClose={() => setRemoveModalOpen(false)} 
        open={removeModalOpen}
        onYesClick={() => setRemoveModalOpen(false)}
        onNoClick={() => removeHandler()}
      >
        <SadElephant />
        <p>정말 삭제하시겠어요?</p>
      </YesNoModal>
      {loading && <QuestionLoader />}
      {!loading && (
        <div className={classes.detail}>
          <header>
            <h3>{`Q. ${question.title}`}</h3>
            {/* <button type="button" onClick={() => setQuestionRoute('main')}><Back /></button> */}
            
            <span>
              {`${question.questionWriterEmail} | ${question?.create_dateTime?.slice(0, question?.create_dateTime?.indexOf('T'))}`}
            </span>
          </header>
          <main className={classes.detail__main}>
            {/* <p>{question.content}</p> */}
            <Markdown review={question.content || ''} />
            {question.code && <Markdown review={codeContent} />}
            {email === question.questionWriterEmail && (
              <div className={classes.detail_btn}>
                <button type="button" onClick={toUpdatePage}>수정</button>
                <button type="button" onClick={() => setRemoveModalOpen(true)}>삭제</button>
              </div>
            )}
          </main>
          <section className={classes.detail__answer}>
            <AnswerForm 
              type="create"
              prevAnswer=""
              prevReview=""
              answerId={-1}
              code={question.code || ''} 
              language={question.language || ''}
              questionId={questionId}
            />
            <AnswerList originalCode={question.code || ''} questionId={questionId} />
          </section>
          <button type="button" className={classes.detail__backBtn} onClick={() => setQuestionRoute('main')}>
            <Back />
          </button>
        </div>
      )}
    </>
  );
};

QuestionDetailPage.propTypes = {
  questionId: PropTypes.number.isRequired,
  setQuestionRoute: PropTypes.func.isRequired,
};

export default QuestionDetailPage;
