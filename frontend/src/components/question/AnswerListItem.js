import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { diffLines, formatLines } from 'unidiff';
import Markdown from './Markdown';
import Modal from '../layout/Modal';
import SadElephant from '../icons/SadElephant';
import classes from './QuestionList.module.css';

const AnswerListItem = ({
  writer, content, review, originalCode,
}) => {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const diffCode = formatLines(diffLines(originalCode, review), { context: 2 });
  const regEx = /-{3} a\n\+{3} b\n@{2} -\d+,?\d? \+\d+,?\d? @{2}\n/g;

  const updatedCode = '```diff\n' + diffCode.replace(regEx, '') + '\n```';

  const removeHandler = (event) => {
    event.preventDefault();

    // axios
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
      <div className={classes.answer__item}>
        <div>
          <span>{writer}</span>
          <div className={classes.answer__item__btn}>
            <button type="button">수정</button>
            <button type="button" onClick={() => setRemoveModalOpen(true)}>삭제</button>
          </div>
        </div>
        <p>{content}</p>
        <Markdown review={updatedCode} />
      </div>
    </>
  );
};

AnswerListItem.propTypes = {
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  originalCode: PropTypes.string.isRequired,
};

export default AnswerListItem;
