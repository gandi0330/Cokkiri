import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Editor from './Editor';
import Modal from '../layout/Modal';
import QuestionDropdown from './QuestionDropdown';
import SadElephant from '../icons/SadElephant';

import classes from './QuestionList.module.css';

const QuestionForm = ({ 
  type, qTitle, qContent, qCode,
}) => {
  const navigate = useNavigate();
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const [title, setTitle] = useState(qTitle);
  const [content, setContent] = useState(qContent);
  const [code, setCode] = useState(qCode);
  const [language, setLanguage] = useState('java');

  const languageOptions = ['java', 'python', 'cpp', 'javascript', 'typescript', 'css', 'html', 'json'];

  const submitHandler = (event) => {
    event.preventDefault();

    // axios 
  };

  return (
    <>
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <div className={classes.question__cancel}>
          <SadElephant />
          <div>
            <p>정말 나가시겠어요?</p>
            <p>지금까지 작성된 내용이 사라집니다.</p>
          </div>
          <div>
            <button type="button" onClick={() => navigate(-1)}>
              나가기
            </button>
            <button type="button" onClick={() => setCancelModalOpen(false)}>
              머무르기
            </button>
          </div>
        </div>
      </Modal>
      <form className={classes.question__form} onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className={classes.question__form__content}>
          <label htmlFor="content">내용</label>
          <span>코끼리는 마크다운도 지원해요!</span>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            cols="30"
            rows="10"
            required
          />
        </div>
        {!codeEditorOpen && (
          <button
            type="button"
            className="question__btn"
            onClick={() => setCodeEditorOpen(true)}
          >
            + 코드 추가하기
          </button>
        )}
        {codeEditorOpen && (
          <div>
            <div className={classes.question__form__code}>
              <label htmlFor="content">코드</label>
              <QuestionDropdown 
                selected={language} 
                setSelected={setLanguage} 
                options={languageOptions} 
              />
            </div>
            {/* <textarea
              name="content"
              id="content"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              cols="30"
              rows="10"
            /> */}
            <Editor code={code} setCode={setCode} language={language} />
          </div>
        )}
        <div className={classes.question__form__btn}>
          <button type="button" onClick={() => setCancelModalOpen(true)}>
            취소하기
          </button>
          <button type="submit">{type}하기</button>
        </div>
      </form>
    </>
  );
};

QuestionForm.propTypes = {
  type: PropTypes.string.isRequired,
  qTitle: PropTypes.string.isRequired,
  qContent: PropTypes.string.isRequired,
  qCode: PropTypes.string.isRequired,
};

export default QuestionForm;
