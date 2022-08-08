import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { diffLines, formatLines } from 'unidiff';
import { getUserEmail } from '../../store/authSlice';
import { deleteAnswer, fetchAnswerList } from '../../store/answerSlice';

import AnswerForm from './AnswerForm';
import YesNoModal from '../layout/YesNoModal';
import Markdown from './Markdown';
import SadElephant from '../icons/SadElephant';
import classes from './QuestionList.module.css';

const AnswerListItem = ({
  answerId, writer, content, review, originalCode, language,
}) => {
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const { questionId } = useParams();
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const diffCode = formatLines(diffLines(originalCode, review), { context: 2 });
  const regEx = /-{3} a\n\+{3} b\n@{2} -\d+,?\d? \+\d+,?\d? @{2}\n/g;

  const updatedCode = '```diff\n' + diffCode.replace(regEx, '') + '\n```';

  const removeClickHandler = () => {
    setRemoveModalOpen(false);
    
    if (email !== writer) return;
    
    dispatch(deleteAnswer({ answerId, email }))
      .unwrap()
      .then(() => {
        dispatch(fetchAnswerList({ questionId }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <YesNoModal
        open={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        yes="취소하기"
        no="삭제하기"
        onYesClick={() => setRemoveModalOpen(false)}
        onNoClick={removeClickHandler}
      >
        <SadElephant />
        <p>정말 삭제하시겠어요?</p>
      </YesNoModal>
      <div className={classes.answer__item}>
        <div>
          <span>{writer}</span>
          {email === writer && (
            <div className={classes.answer__item__btn}>
              <button type="button" onClick={() => setEditOpen((prev) => !prev)}>
                {editOpen ? '수정 취소' : '수정'}
              </button>
              <button type="button" onClick={() => setRemoveModalOpen(true)}>삭제</button>
            </div>
          )}
        </div>
        {!editOpen && content && (
          <div className={classes.answer__markdown}>
            <Markdown review={content} />
          </div>
        )}
        {!editOpen && originalCode && review && <Markdown review={updatedCode} />}
        {editOpen && (
          <AnswerForm
            type="edit"
            answerId={answerId || -1}
            prevAnswer={content}
            prevReview={review} 
            code={originalCode} 
            language={language} 
          />
        )}
      </div>
    </>
  );
};

AnswerListItem.propTypes = {
  answerId: PropTypes.number.isRequired,
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  originalCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default AnswerListItem;
